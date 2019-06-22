import React, { useContext } from "react";
import { Context } from "../Container";
import { createElementClass } from "../../helpers";

export interface NavigationNode {
  label: string;
  url: string;
  children?: NavigationNode[];
}

export interface NavigationNodes {
  component: React.ReactNode;
  nodes: NavigationNode[];
}

function createNavigation(navigationNodes: NavigationNodes): React.ReactNode {
  const Component: React.ReactNode = navigationNodes.component;
  
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

export const Navigation: React.FunctionComponent = () => {
  const { navigationNodes } = useContext(Context);

  if (!navigationNodes) {
    return null;
  }

  return <>{createNavigation(navigationNodes)}</>;
};
