import React from "react";
import { useDCContext } from "../../common";
import { GroupProvider } from "./groupProvider";
import { v4 as uuidV4 } from "uuid";

import {
  Sources,
  SourceWithOptions,
  SourceGroupWithOptions,
  isSourceWithOptions,
} from "../../interfaces";
import {
  Renderers,
  SingleRenderer,
  SingleRendererComponent,
  GroupRendererComponent,
} from "./types";

function renderGroupRenderer(
  sources: SourceGroupWithOptions,
  groupRenderer?: React.ReactNode,
  singleRenderers?: SingleRenderer[],
): React.ReactNode {
  const renderedSources = sources.sources.map(source => {
    if (source.source.data) {
      source.source.data.renderedContent = renderSingleRenderer(
        source,
        singleRenderers,
        true,
      );
    }
    return source;
  });
  if (!groupRenderer) {
    return (
      <>
        {renderedSources.map(s => {
          if (s.source.data) {
            return (
              <React.Fragment key={s.source.rawContent}>
                {s.source.data.renderedContent}
              </React.Fragment>
            );
          }
          return null;
        })}
      </>
    );
  }

  const Component = groupRenderer as React.FunctionComponent<
    GroupRendererComponent
  >;
  const srcs = renderedSources.map(s => s.source);

  return (
    <GroupProvider sources={srcs} key={uuidV4()}>
      <Component sources={srcs} />
    </GroupProvider>
  );
}

function renderSingleRenderer(
  source: SourceWithOptions,
  renderers?: SingleRenderer[],
  isGroup?: boolean,
): React.ReactNode {
  const renderedContent =
    source.source.data && source.source.data.renderedContent;

  if (!renderedContent) {
    return null;
  }

  const singleRenderer =
    renderers && renderers.find(r => r.sourceType.includes(source.source.type));
  if (!singleRenderer) {
    return renderedContent;
  }

  const Component = singleRenderer.component as React.FunctionComponent<
    SingleRendererComponent
  >;
  const s = isGroup
    ? {
        ...source.source,
        data: {
          ...source.source.data,
          renderedContent,
        },
      }
    : source.source;

  return (
    <Component
      source={s}
      renderedContent={renderedContent}
      isGroup={Boolean(isGroup)}
      key={source.source.rawContent}
    />
  );
}

function render(sources: Sources, renderers?: Renderers): React.ReactNode[] {
  const singleRenderers = renderers && renderers.single;
  const groupRenderers = renderers && renderers.group;

  return sources.map(source => {
    if (isSourceWithOptions(source)) {
      return renderSingleRenderer(source, singleRenderers, false);
    }
    return renderGroupRenderer(source, groupRenderers, singleRenderers);
  });
}

export interface ContentProps {
  renderers?: Renderers;
}

const Content: React.FunctionComponent<ContentProps> = ({ renderers = {} }) => {
  const { sources } = useDCContext();

  return <>{render(sources, renderers)}</>;
};

export { Content };
export * from "./types";
