import React from "react";
import { removeMarkdownSyntax } from "../external";
import {
  createElementClass,
  createModifierClass,
  toKebabCase,
} from "../helpers";

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  headings: Set<string>;
  headingPrefix?: string;
}

export const Heading: React.FunctionComponent<HeadingProps> = ({
  level = 6,
  headings,
  headingPrefix = "",
  children,
}) => {
  if (!children) {
    return null;
  }

  let heading = (children as any[]).find(
    child => child.key && child.key.startsWith("text"),
  );
  if (!heading) {
    return null;
  }

  heading = heading.props && heading.props.value;
  if (!heading) {
    return null;
  }

  heading = headingPrefix ? `${headingPrefix}-${heading}` : heading;
  if (headings.has(heading)) {
    if (/[1-9]$/.test(heading)) {
      heading = `${heading}-${Number(heading[heading.length - 1]) + 1}`;
    } else {
      heading = `${heading}-1`;
    }
  }
  heading = removeMarkdownSyntax(heading);
  headings.add(heading);
  const id = toKebabCase(heading);

  return React.createElement(`h${level}`, {
    children,
    className: `${createElementClass("heading")} ${createModifierClass(
      `level-${level}`,
      "heading",
    )}`,
    id,
  });
};
