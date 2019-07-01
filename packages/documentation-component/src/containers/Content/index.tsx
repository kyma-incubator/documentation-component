import React from "react";
import { useContext } from "../../common";
import { Provider } from "./groupProvider";
import { createElementClass } from "../../helpers";
import { RenderedContent } from "./RenderedContent";
import {
  Source,
  PureSources,
  RenderEngineWithOptions,
  RenderEngineProps,
} from "../../interfaces";

export interface SingleRendererComponent {
  source: Source;
  isGroup: boolean;
  k: string;
}

export interface GroupRendererComponent {
  sources: Source[];
}

export interface SingleRenderer {
  sourceType: string[];
  component: React.ReactNode;
}

export interface Renderers {
  single?: SingleRenderer[];
  group?: React.ReactNode;
}

function renderGroup(
  sources: Source[],
  groupRenderer?: React.ReactNode,
): React.ReactNode {
  if (!groupRenderer) {
    return <>{sources.map(source => source.data.renderedContent)}</>;
  }

  return (
    <Provider sources={sources}>
      {React.createElement(groupRenderer as string, {
        sources,
      })}
    </Provider>
  );
}

function renderEngine(
  source: Source,
  renderEngines: RenderEngineWithOptions[],
): React.ReactNode {
  const re = renderEngines.find(r =>
    r.renderEngine.sourceTypes.includes(source.type),
  );

  if (re) {
    const component = re.renderEngine.component as string;
    const options = re.options;

    return React.createElement(component, {
      source,
      options,
      key: source.rawContent.substring(0, 30),
    } as RenderEngineProps);
  }
  return null;
}

function renderSingle(
  source: Source,
  renderEngines: RenderEngineWithOptions[],
  isGroup?: boolean,
  renderers?: SingleRenderer[],
): React.ReactNode {
  let renderedContent = renderEngine(source, renderEngines);
  if (!renderedContent) return null;

  const singleRenderer =
    renderers && renderers.find(r => r.sourceType.includes(source.type));
  if (singleRenderer) {
    const component = singleRenderer.component as string;

    renderedContent = React.createElement(component, {
      source: {
        ...source,
        data: {
          ...source.data,
          renderedContent,
        },
      },
      isGroup,
      k: source.rawContent.substring(0, 30),
    });
  }

  return renderedContent;
}

function render(
  sources: PureSources,
  renderEngines: RenderEngineWithOptions[],
  renderers?: Renderers,
): React.ReactNode[] {
  const singleRenderers = renderers && renderers.single;
  return sources.map(source => {
    if (!Array.isArray(source)) {
      return renderSingle(source, renderEngines, false, singleRenderers);
    }
    const renderedGroup = source.map(s => ({
      ...s,
      data: {
        ...s.data,
        renderedContent: renderSingle(s, renderEngines, false, singleRenderers),
      },
    }));

    const groupRenderer = renderers && renderers.group;
    return renderGroup(renderedGroup, groupRenderer);
  });
}

export interface ContentProps {
  renderers?: Renderers;
}

const Content: React.FunctionComponent<ContentProps> = ({ renderers = {} }) => {
  const { sources, renderEngines } = useContext();

  if (!sources || !renderEngines) {
    return null;
  }
  const renderedSources = render(sources, renderEngines, renderers);

  return <>{renderedSources}</>;
};

export { Content, RenderedContent };
