import React, { useContext } from "react";
import { Context } from "../Container";
import { Source } from "../../interfaces";
import { Header } from "../../plugins/markdownHeaders/extractorPlugin";
import { createElementClass } from "../../helpers";

const contextNavigationClassName = "context-navigation";

function extractHeaders(sources: Source[]): Header[] {
  return sources
    .map(source => {
      if (source.metadata && source.metadata.headers) {
        return source.metadata.headers;
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
        `${contextNavigationClassName}-list-level-${header.level}`,
      )}
      key={`${contextNavigationClassName}-list-level-${header.id}`}
    >
      <li
        className={createElementClass(
          `${contextNavigationClassName}-list-item`,
        )}
        key={`${contextNavigationClassName}-list-item-${header.id}`}
      >
        <span id={header.id}>{header.title}</span>
        {renderHeaders(header.children)}
      </li>
    </ul>
  ));
}

export const ContextNavigation: React.FunctionComponent = () => {
  const { sources } = useContext(Context);

  if (!sources) {
    return null;
  }
  const headers = extractHeaders(sources);

  return (
    <div
      className={createElementClass(`${contextNavigationClassName}-wrapper`)}
    >
      {renderHeaders(headers)}
    </div>
  );
};
