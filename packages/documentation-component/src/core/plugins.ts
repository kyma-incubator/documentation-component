import {
  Sources,
  Plugin,
  PluginType,
  PluginT,
  PluginOptions,
  ExtractorPlugin,
  ExtractorPluginReturnType,
  MutationPlugin,
  MutationPluginReturnType,
  Plugins,
  isSourceGroupWithOptions,
  isPluginWithOptions,
  SourceWithOptions,
  SourceGroupWithOptions,
} from "../interfaces";
import deepmerge from "deepmerge";

function runExtractor(
  source: SourceWithOptions,
  plugin: ExtractorPlugin,
  options?: PluginOptions,
): SourceWithOptions {
  const newData: ExtractorPluginReturnType = plugin({
    source: source.source,
    options,
  });

  const newSource = { ...source };
  newSource.source.data = {
    ...source.source.data,
    ...newData,
  };

  return newSource;
}

function runMutation(
  source: SourceWithOptions,
  plugin: MutationPlugin,
  options?: PluginOptions,
): SourceWithOptions {
  const newContent: MutationPluginReturnType = plugin({
    source: source.source,
    options,
  });

  const newSource = { ...source };
  newSource.source.content = newContent;

  return newSource;
}

function runPlugin(
  source: SourceWithOptions,
  pluginT: PluginT,
  sourceGroupPluginOptions?: PluginOptions,
): SourceWithOptions {
  let pluginOptions: PluginOptions = {};
  let plugin: Plugin;

  if (isPluginWithOptions(pluginT)) {
    pluginOptions = pluginT.options;
    plugin = pluginT.plugin;
  } else {
    plugin = pluginT;
  }

  if (!plugin.sourceTypes || !plugin.sourceTypes.includes(source.source.type)) {
    return source;
  }

  const sourcePlugins =
    source.pluginsOptions &&
    source.pluginsOptions.find(p => p.name === plugin.name);
  const sourcePluginOptions: PluginOptions | undefined =
    sourcePlugins && sourcePlugins.options;

  const options: PluginOptions = deepmerge.all<PluginOptions>([
    pluginOptions || {},
    sourceGroupPluginOptions || {},
    sourcePluginOptions || {},
  ]);

  switch (plugin.type) {
    case PluginType.EXTRACTOR:
      return runExtractor(source, plugin.fn as ExtractorPlugin, options);
    case PluginType.MUTATION:
      return runMutation(source, plugin.fn as MutationPlugin, options);
    default:
      return source;
  }
}

function runPluginForGroup(
  sources: SourceGroupWithOptions,
  plugin: PluginT,
): SourceGroupWithOptions {
  const sourceGroupPluginOptions: PluginOptions | undefined =
    sources.pluginsOptions &&
    sources.pluginsOptions.find(p => {
      if (isPluginWithOptions(plugin)) {
        return p.name === plugin.plugin.name;
      }
      return p.name === plugin.name;
    });

  const processedSources = sources.sources.map(source =>
    runPlugin(source, plugin, sourceGroupPluginOptions),
  );

  return {
    ...sources,
    sources: processedSources,
  };
}

function runPlugins(sources: Sources, plugins?: Plugins): Sources {
  if (!plugins || !plugins.length) {
    return sources;
  }

  let processedSources: Sources = sources;
  plugins.map(plugin => {
    processedSources = processedSources.map(source => {
      if (isSourceGroupWithOptions(source)) {
        return runPluginForGroup(source, plugin);
      }
      return runPlugin(source, plugin);
    });
  });

  return processedSources;
}

export { runPlugins };
