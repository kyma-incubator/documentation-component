import React, { useContext } from "react";
import { Context } from "../Container";
import { Markdown, Renderers } from "../../components";
import { createElementClass } from "../../helpers";
import { Source, ParserPlugin } from "../../interfaces";

function createContent(
  sources: Source[],
  parsers: ParserPlugin[],
  customRenderers?: Partial<Renderers>,
): React.ReactNode {
  const articles = sources.map((source, index) => (
    <article
      className={createElementClass("content-doc")}
      key={`content-doc-${index}`}
    >
      <Markdown
        source={source.content ? source.content : source.source}
        customRenderers={customRenderers}
        parsers={parsers}
      />
    </article>
  ));

  return (
    <section className={createElementClass("content")}>{articles}</section>
  );
}

export const Content: React.FunctionComponent = () => {
  const { sources, parsers, customRenderers } = useContext(Context);

  if (!sources) {
    return null;
  }

  return <>{createContent(sources, parsers, customRenderers)}</>;
};
