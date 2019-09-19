import React from "react";
import { plugins } from "@kyma-project/dc-markdown-render-engine";

export type Header = plugins.Header;
export type ActiveAnchors = plugins.ActiveAnchors;

const HN = plugins.HeadersNavigation;

export const HeadersNavigation: React.FunctionComponent = () => (
  <div>
    <HN enableSmoothScroll={true} offset={16}>
      <RenderedHeader />
    </HN>
  </div>
);

interface RenderedHeaderProps {
  headers?: Header[];
  activeAnchors?: ActiveAnchors;
}

const RenderedHeader: React.FunctionComponent<RenderedHeaderProps> = ({
  headers,
  activeAnchors,
}) => {
  const context = plugins.useHeadersContext();
  if (!context) {
    return null;
  }

  const { headers: h, getActiveAnchors } = context;
  if (!headers) {
    headers = h;
  }
  const aa = getActiveAnchors();
  if (aa) {
    activeAnchors = aa;
  }

  const anchorsList = headers.map((header, index) => (
    <HeaderItem key={index} header={header} activeAnchors={activeAnchors} />
  ));

  return <ul>{anchorsList}</ul>;
};

interface HeaderItemProps {
  header: Header;
  activeAnchors?: ActiveAnchors;
}

const HeaderItem: React.FunctionComponent<HeaderItemProps> = ({
  header,
  activeAnchors,
}) => (
  <li>
    <a href={`#${header.id}`}>{header.title}</a>
    {header.children && (
      <RenderedHeader headers={header.children} activeAnchors={activeAnchors} />
    )}
  </li>
);
