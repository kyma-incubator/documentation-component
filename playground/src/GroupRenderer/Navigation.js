import React from "react";
import { plugins } from "@kyma-project/dc-markdown-render-engine";

const HN = plugins.HeadersNavigation;

export const HeadersNavigation = () => {
  return (
    <div>
      <HN enableSmoothScroll={true} offset={16}>
        <RenderedHeader />
      </HN>
    </div>
  );
};

const RenderedHeader = ({ headers, activeAnchors }) => {
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

const HeaderItem = ({ header, activeAnchors }) => {
  return (
    <li>
      <a href={`#${header.id}`}>{header.title}</a>
      {header.children && (
        <RenderedHeader
          headers={header.children}
          activeAnchors={activeAnchors}
        />
      )}
    </li>
  );
};
