import React from "react";
import { useContext } from "../../common";
import { Source } from "../../interfaces";
import { Header } from "./types";
import { createElementClass } from "../../helpers";

const tocClassName = "toc";

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

function renderHeaders(headers?: Header[]): React.ReactNode {
  if (!headers || !headers.length) return null;

  return headers.map(header => (
    <ul
      className={createElementClass(
        `${tocClassName}-list-level-${header.level}`,
      )}
      key={`${tocClassName}-list-level-${header.id}`}
    >
      <li
        className={createElementClass(
          `${tocClassName}-list-item`,
        )}
        key={`${tocClassName}-list-item-${header.id}`}
      >
        <a href={`#${header.id}`}>{header.title}</a>
        {renderHeaders(header.children)}
      </li>
    </ul>
  ));
}

export interface HeadersNavigationProps {
  sources: Source[];
}

export const HeadersNavigation: React.FunctionComponent<HeadersNavigationProps> = ({
  sources,
}) => {
  const headers = extractHeaders(sources);

  return (
    <div
      className={createElementClass(`${tocClassName}-wrapper`)}
    >
      {renderHeaders(headers)}
    </div>
  );
};
