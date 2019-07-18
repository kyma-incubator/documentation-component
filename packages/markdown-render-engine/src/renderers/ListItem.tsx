import React from "react";
import { createElementClass } from "../helpers";

export interface ListItemProps {
  checked: boolean;
  index: number;
}

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  index,
  children,
}) => (
  <li className={createElementClass("list-item")} key={index}>
    {children}
  </li>
);
