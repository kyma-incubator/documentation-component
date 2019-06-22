import React from "react";
import { useContext } from "../../common";
import { createElementClass } from "../../helpers";
import { Source, PureSources, RenderEngineWithOptions } from "../../interfaces";

export interface RenderEngineProps {
  sourceTypes: string[];
}

interface renderEngineArgs {
  source: Source;
  renderEngines: RenderEngineWithOptions[];
}

function renderEngine({ source, renderEngines }: renderEngineArgs): React.ReactNode {
  const renderEngine: RenderEngineWithOptions = renderEngines.find(r => r.renderEngine.sourceTypes.includes(source.type));

  if (renderEngine) {

  }
  return null;
}

interface renderArgs {
  sources: PureSources, 
  renderEngines: RenderEngineWithOptions[];
}

function render({
  sources = [],
  renderEngines = [],
}: renderArgs): React.ReactNode {
  const articles = sources.map((source, index) => (
    <article
      className={createElementClass("content-doc")}
      key={`content-doc-${index}`}
    >
      <Markdown
        source={source.content ? source.content : source.source}
      />
    </article>
  ));

  return (
    <section className={createElementClass("content")}>{articles}</section>
  );
}

export const RenderEngine: React.FunctionComponent<RenderEngineProps> = ({

}) => {
  const { sources, renderEngines } = useContext();

  if (!sources || !renderEngines) {
    return null;
  }

  return <>{render({ sources, renderEngines })}</>;
};
