import React from "react";
import { createElementClass } from "../helpers";

export interface ListProps {
  start: number;
  ordered: boolean;
  tight: boolean;
  depth: number;
}

export const List: React.FunctionComponent<ListProps> = ({
  start,
  ordered,
  tight,
  depth,
  children,
}) => {
  if (ordered) {
    return (
      <ol className={createElementClass("list-ordered")} start={start}>
        {children}
      </ol>
    );
  }

  return <ul className={createElementClass("list-unordered")}>{children}</ul>;
};
