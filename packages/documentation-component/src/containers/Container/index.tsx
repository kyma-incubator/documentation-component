import React from "react";
import createUseContext from "constate";
import {
  Options,
  Source,
  Plugin,
  PluginType,
  ExtractorPlugin,
  ExtractorPluginReturnType,
  MutationPlugin,
  MutationPluginReturnType,
  ParserPlugin,
} from "../../interfaces";

const runExtractor = (source: Source, plugin: ExtractorPlugin): Source => {
  const newMetadata: ExtractorPluginReturnType = plugin(source);

  return {
    ...source,
    metadata: {
      ...source.metadata,
      ...newMetadata,
    },
  };
};

const runMutation = (source: Source, plugin: MutationPlugin): Source => {
  const newContent: MutationPluginReturnType = plugin(source);

  return {
    ...source,
    content: newContent,
  };
};

function runPlugins(sources: Source[], plugins?: Plugin[]): Source[] {
  if (!plugins || !plugins.length) return sources;

  plugins.map(plugin => {
    sources = sources.map(source => {
      if (!plugin.allowedSourceType.includes(source.type)) return source;

      switch (plugin.type) {
        case PluginType.EXTRACTOR:
          return runExtractor(source, plugin.fun as ExtractorPlugin);
        case PluginType.MUTATION:
          return runMutation(source, plugin.fun as MutationPlugin);
        default:
          return source;
      }
    });
  });

  return sources;
}

function extractParserPlugins(plugins?: Plugin[]): ParserPlugin[] {
  if (!plugins || !plugins.length) return [];

  return plugins
    .filter(plugin => plugin.type === PluginType.PARSER)
    .map(plugin => plugin.fun as ParserPlugin);
}

const Container = (context: Options) => {
  let processedSources: Source[] = runPlugins(context.sources, context.plugins);
  const parsers: ParserPlugin[] = extractParserPlugins(context.plugins);

  return {
    originalSources: context.sources,
    sources: processedSources,
    parsers,
    customRenderers: context.customRenderers,
  };
};

const { Provider, Context } = createUseContext(Container);
const HeadlessCMS = { Provider, Context };

export { HeadlessCMS, Provider, Context };
