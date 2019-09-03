import React from "react";
import has from "lodash/has";
import { createElementClass, createModifierClass } from "../helpers";

export type BlockquoteType = "note" | "tip" | "caution" | undefined;
export interface BlockquoteProps {
  types?: string[];
}

export const Blockquote: React.FunctionComponent<BlockquoteProps> = ({
  children,
  types = [],
}) => {
  const blockquoteTag = "blockquote";
  const panelTypes: string[] = ["note", "caution", "tip", ...types];

  const isOneOfTypes = (arg?: string) => !!arg && panelTypes.includes(arg);

  const getPanelType = (child: any): string => {
    const type =
      has(child, "props.children[0].props.children[0].props") &&
      child.props.children[0].props.children[0].props.value;

    return (type && type.replace(":", "").toLowerCase()) || "";
  };

  const createPanels = (elem: any) => {
    if (!elem) {
      return null;
    }

    return elem.map((elements: React.ReactChild[], index: number) => (
      <blockquote
        className={`${createElementClass(blockquoteTag)} ${createModifierClass(
          getPanelType(elements[0]),
          blockquoteTag,
        )}`}
        key={index}
      >
        <div className={createElementClass(`${blockquoteTag}-content`)}>
          {elements}
        </div>
      </blockquote>
    ));
  };

  let modifiedChildren = null;

  if (children && Array.isArray(children)) {
    modifiedChildren = children.reduce((accumulator: any, curr: any) => {
      const currType = getPanelType(curr);

      if (isOneOfTypes(currType)) {
        return [...accumulator, [curr]];
      }

      const len = accumulator.length - 1;

      if (len < 0 || !accumulator[len]) {
        return [[curr]];
      }

      if (!Array.isArray(accumulator[len])) {
        return [[accumulator], curr];
      }

      const newLastElement = [...accumulator[len], curr];
      return [...accumulator.slice(0, len), newLastElement];
    }, []);
  }

  return modifiedChildren ? <>{createPanels(modifiedChildren)}</> : null;
};
