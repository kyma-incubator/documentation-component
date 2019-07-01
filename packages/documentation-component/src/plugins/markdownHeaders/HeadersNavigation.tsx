import React, { useEffect, useState, useContext as uc } from "react";
import createUseContext from "constate";
import { useContext } from "../../common";
import { PureSources, Source } from "../../interfaces";
import { Header, ActiveAnchors } from "./types";
import { createElementClass } from "../../helpers";
import { scrollSpy, ScrollSpyArgs } from "./scrollSpy";

const tocClassName = "toc";

export interface HeadersNavigationProps {
  sources?: PureSources;
  sourceTypes?: string[];
  selector?: string; // must contains anchor html tag
  offset?: number;
  cachingHeadings?: boolean;
}

function flatHeaders(headers?: Header[]): Header[] {
  if (!headers) {
    return [];
  }

  let children: Header[] = [];
  for (const header of headers) {
    children = [...children, ...flatHeaders(header.children)];
  }

  return [...headers, ...children];
}

function extractHeaders(sources: Source[]): Header[] {
  return sources
    .map(source => {
      if (source.data) {
        return source.data.headers;
      }
      return [];
    })
    .reduce((a, b) => a.concat(b), []);
}

const HeadersProvider = ({
  sources,
  sourceTypes = ["markdown", "md"],
  selector = `.${createElementClass(`${tocClassName}-wrapper`)} li > a`,
  offset = 10,
  cachingHeadings = true,
}: HeadersNavigationProps) => {
  const emptyAnchors: ActiveAnchors = {
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
  };
  const [activeAnchors, setActiveAnchors] = useState<ActiveAnchors>(
    emptyAnchors,
  );
  const [activeAnchor, setActiveAnchor] = useState<string>("");

  useEffect(() => {
    const args: ScrollSpyArgs = {
      selector,
      offset,
      cachingHeadings,
      callback: (hash: string) => {
        setActiveAnchor(hash);
      },
    };

    const removeListeners = scrollSpy(args);
    return () => {
      removeListeners();
    };
  }, []);

  useEffect(() => {
    setActiveAnchors(emptyAnchors);
    setAnchors(flattenHeaders);
  }, [activeAnchor]);

  const setActiveParent = (header: Header) => {
    setActiveAnchors(anchors => ({
      ...anchors,
      [header.level]: header.id,
    }));
    if (header.parent) {
      setActiveParent(header.parent);
    }
  };
  const setAnchors = (h: Header[]) => {
    for (const header of h) {
      if (activeAnchor === header.id) {
        setActiveParent(header);
      }
    }
  };

  let srcs = sources;
  const { sources: s } = useContext();
  if (!srcs || !srcs.length) {
    srcs = s;
  }
  if (!srcs || !srcs.length) {
    return;
  }
  if (srcs.length === 1) {
    srcs = srcs[0] as Source[];
  }
  const arrOfSources = srcs as Source[];

  const filteredSources = arrOfSources.filter(source =>
    sourceTypes.includes(source.type),
  );
  if (!filteredSources || !filteredSources.length) {
    return;
  }
  const headers = extractHeaders(filteredSources);
  const flattenHeaders = flatHeaders(headers);

  return {
    activeAnchors,
    headers,
    className: tocClassName,
  };
};

const { Provider, Context } = createUseContext(HeadersProvider);

const HeadersNavigation: React.FunctionComponent<HeadersNavigationProps> = ({
  children,
  ...others
}) => <Provider {...others}>{children}</Provider>;
function useHeadersContext() {
  return uc(Context);
}

export { HeadersNavigation, useHeadersContext };
