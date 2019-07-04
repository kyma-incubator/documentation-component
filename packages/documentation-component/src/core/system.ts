import {
  Source,
  SourceGroup,
  SourceWithPluginsOptions,
  SourceGroupWithPluginsOptions,
  Sources,
  PureSources,
  Plugin,
  PluginType,
  PluginOptions,
  ExtractorPlugin,
  ExtractorPluginReturnType,
  MutationPlugin,
  MutationPluginReturnType,
} from "../interfaces";

function simpleConcatenatePluginOptions(sources: Sources): Sources {
  return sources.map(source => {
    if ((source as SourceGroupWithPluginsOptions).sources) {
      const pluginsOptions = (source as SourceGroupWithPluginsOptions)
        .pluginsOptions;
      const group = (source as SourceGroupWithPluginsOptions).sources.map(s => {
        const src = s as SourceWithPluginsOptions;
        if (src.source) {
          if (!src.pluginsOptions) {
            return {
              ...src,
              pluginsOptions,
            };
          }
          return {
            ...s,
            pluginsOptions: {
              ...pluginsOptions,
              ...src.pluginsOptions,
            },
          } as SourceWithPluginsOptions;
        }
        return {
          source: s,
          pluginsOptions,
        } as SourceWithPluginsOptions;
      });
      return {
        ...source,
        sources: group,
      };
    }
    return source;
  });
}

function processSource(
  source: Source | SourceWithPluginsOptions,
): SourceWithPluginsOptions {
  if ((source as SourceWithPluginsOptions).source) {
    return source as SourceWithPluginsOptions;
  }
  return {
    source,
    pluginsOptions: {},
  } as SourceWithPluginsOptions;
}

function processGroup(sources: SourceGroup): SourceWithPluginsOptions[] {
  return sources.map(source =>
    processSource(source),
  ) as SourceWithPluginsOptions[];
}

function processSources(sources: Sources): Sources {
  return sources.map(source => {
    if ((source as SourceGroupWithPluginsOptions).sources) {
      const group = processGroup(
        (source as SourceGroupWithPluginsOptions).sources,
      );
      return {
        sources: group,
        pluginsOptions: (source as SourceGroupWithPluginsOptions)
          .pluginsOptions,
      };
    }
    if (Array.isArray(source)) {
      return processGroup(source as SourceGroup);
    }
    return processSource(source as (Source | SourceWithPluginsOptions));
  });
}

function extractSource(source: Source | SourceWithPluginsOptions): Source {
  if ((source as SourceWithPluginsOptions).source) {
    return (source as SourceWithPluginsOptions).source;
  }
  return source as Source;
}

function extractSourceGroup(sources: SourceGroup): Source[] {
  return sources.map(source => extractSource(source)) as Source[];
}

function extractSources(sources: Sources): PureSources {
  return sources.map(source => {
    if ((source as SourceGroupWithPluginsOptions).sources) {
      return extractSourceGroup(
        (source as SourceGroupWithPluginsOptions).sources,
      );
    }
    if (Array.isArray(source)) {
      return extractSourceGroup(source as SourceGroup);
    }
    return extractSource(source as (Source | SourceWithPluginsOptions));
  });
}

function runExtractor(
  source: SourceWithPluginsOptions,
  plugin: ExtractorPlugin,
  options?: PluginOptions,
): SourceWithPluginsOptions {
  const newData: ExtractorPluginReturnType = plugin({
    source: source.source,
    options,
  });

  return {
    ...source,
    source: {
      ...source.source,
      data: {
        ...source.source.data,
        ...newData,
      },
    },
  };
}

function runMutation(
  source: SourceWithPluginsOptions,
  plugin: MutationPlugin,
  options?: PluginOptions,
): SourceWithPluginsOptions {
  const newContent: MutationPluginReturnType = plugin({
    source: source.source,
    options,
  });

  return {
    ...source,
    source: {
      ...source.source,
      content: newContent,
    },
  };
}

function runPlugin(
  source: SourceWithPluginsOptions,
  plugin: Plugin,
): SourceWithPluginsOptions {
  if (!plugin.sourceTypes || !plugin.sourceTypes.includes(source.source.type)) {
    return source;
  }
  const pluginOptions =
    source.pluginsOptions &&
    source.pluginsOptions.find(p => p.name === plugin.name);

  let options: PluginOptions | undefined;
  if (pluginOptions) {
    options = pluginOptions.options;
  }

  switch (plugin.type) {
    case PluginType.EXTRACTOR:
      return runExtractor(source, plugin.fn as ExtractorPlugin, options);
    case PluginType.MUTATION:
      return runMutation(source, plugin.fn as MutationPlugin, options);
    default:
      return source;
  }
}

function runPluginForGroup(sources: SourceGroup, plugin: Plugin): SourceGroup {
  return sources.map(source =>
    runPlugin(source as SourceWithPluginsOptions, plugin),
  );
}

function runPlugins(sources: Sources, plugins?: Plugin[]): PureSources {
  if (!plugins || !plugins.length) return extractSources(sources);
  const concatenatedSources: Sources = simpleConcatenatePluginOptions(sources);
  let processedSources: Sources = processSources(concatenatedSources);

  plugins.map(plugin => {
    processedSources = processedSources.map(source => {
      if ((source as SourceGroupWithPluginsOptions).sources) {
        return runPluginForGroup(
          (source as SourceGroupWithPluginsOptions).sources,
          plugin,
        );
      }
      if (Array.isArray(source)) {
        return runPluginForGroup(source as SourceGroup, plugin);
      }
      return runPlugin(source as SourceWithPluginsOptions, plugin);
    });
  });

  return extractSources(processedSources);
}

export { runPlugins };
