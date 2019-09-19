import {
  Options,
  Source,
  Sources,
  PureSources,
  isSourceGroupWithOptions,
  SourceWithOptions,
  SourceGroupWithOptions,
} from "../interfaces";
import { runPlugins } from "./plugins";
import { runRender } from "./render";

function serializeSource(source: SourceWithOptions): SourceWithOptions {
  source.source.data = source.source.data || {};
  if (typeof source.source.rawContent === "string") {
    source.source.rawContent = source.source.rawContent.trim();
  }
  return source;
}

function serializeSourceGroup(
  group: SourceGroupWithOptions,
): SourceGroupWithOptions {
  return {
    ...group,
    sources: group.sources.map(s => serializeSource(s)),
  };
}

function serializeSources(sources: Sources): Sources {
  return sources.map(source => {
    if (isSourceGroupWithOptions(source)) {
      return serializeSourceGroup(source);
    }
    return serializeSource(source);
  });
}

function extractSource(source: SourceWithOptions): Source {
  return source.source;
}

function extractSourceGroup(group: SourceGroupWithOptions): Source[] {
  return group.sources.map(s => extractSource(s));
}

function extractSources(sources: Sources): PureSources {
  return sources.map(source => {
    if (isSourceGroupWithOptions(source)) {
      return extractSourceGroup(source);
    }
    return extractSource(source);
  });
}

function runSystem(options: Options): Sources {
  let preProcessedSources: Sources = runPlugins(
    options.sources,
    options.plugins,
  );
  preProcessedSources = serializeSources(options.sources);
  preProcessedSources = runRender(options.sources, options.renderEngines);

  return preProcessedSources;
}

export { runSystem, extractSources };
