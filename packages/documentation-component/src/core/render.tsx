import React from "react";
import {
  Source,
  Sources,
  SourceWithOptions,
  SourceGroupWithOptions,
  RenderEngineWithOptions,
  RenderEngineProps,
  RenderEngineOptions,
  RenderEngines,
  isSourceWithOptions,
  isRenderEngineWithOptions,
} from "../interfaces";
import deepmerge from "deepmerge";
import uuidv1 from "uuid/v1";

function renderEngine(
  source: SourceWithOptions,
  renderEngines: RenderEngines,
  sourceGroupRenderEngineOptions?: RenderEngineOptions,
): React.ReactNode {
  const re = renderEngines.find(r => {
    if (isRenderEngineWithOptions(r)) {
      return r.renderEngine.sourceTypes.includes(source.source.type);
    }
    return r.sourceTypes.includes(source.source.type);
  });

  if (!re) {
    return null;
  }

  let renderE: RenderEngineWithOptions;
  if (isRenderEngineWithOptions(re)) {
    renderE = re;
  } else {
    renderE = {
      renderEngine: re,
      options: {},
    };
  }

  const Render = renderE.renderEngine.component as React.FunctionComponent<
    RenderEngineProps
  >;

  const renderEngineOptions = renderE.options;
  const sourceRenderEngineOptions = source.renderEngineOptions;

  const options: RenderEngineOptions = deepmerge.all<RenderEngineOptions>([
    renderEngineOptions || {},
    sourceGroupRenderEngineOptions || {},
    sourceRenderEngineOptions || {},
  ]);

  const s: Source = {
    ...source.source,
    data: {
      ...source.source.data,
    },
  };

  return <Render source={s} options={options} key={uuidv1()} />;
}

function renderGroup(
  sources: SourceGroupWithOptions,
  renderEngines: RenderEngines,
): SourceGroupWithOptions {
  return {
    ...sources,
    sources: sources.sources.map(source =>
      renderSingle(source, renderEngines, sources.renderEngineOptions),
    ),
  };
}

function renderSingle(
  source: SourceWithOptions,
  renderEngines: RenderEngines,
  sourceGroupRenderEngineOptions?: RenderEngineOptions,
): SourceWithOptions {
  source.source.data.renderedContent = renderEngine(
    source,
    renderEngines,
    sourceGroupRenderEngineOptions,
  );
  return source;
}

function runRender(sources: Sources, renderEngines: RenderEngines): Sources {
  return sources.map(source => {
    if (isSourceWithOptions(source)) {
      return renderSingle(source, renderEngines);
    }
    return renderGroup(source, renderEngines);
  });
}

export { runRender };
