import React from "react";
import { createElementClass, createModifierClass } from "../../../helpers";

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading: React.FunctionComponent<HeadingProps> = ({
  level = 6,
  children,
}) => {
  return React.createElement(`h${level}`, {
    children,
    className: `${createElementClass("heading")} ${createModifierClass(
      `level-${level}`,
      "heading",
    )}`,
    id: "dupa"
  });
};
