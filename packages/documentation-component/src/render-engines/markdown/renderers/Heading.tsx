import React from "react";
import {
  createElementClass,
  createModifierClass,
  toKebabCase,
} from "../../../helpers";

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  headingPrefix?: string;
}

export const Heading: React.FunctionComponent<HeadingProps> = ({
  level = 6,
  headingPrefix = "",
  children,
}) => {
  if (!children) {
    return null;
  }
  let heading = (children as any[])[0].props.value as string;
  heading = headingPrefix ? `${headingPrefix}-${heading}` : heading;

  return React.createElement(`h${level}`, {
    children,
    className: `${createElementClass("heading")} ${createModifierClass(
      `level-${level}`,
      "heading",
    )}`,
    id: toKebabCase(heading),
  });
};
