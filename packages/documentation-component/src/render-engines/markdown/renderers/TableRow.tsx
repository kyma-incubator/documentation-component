import React from "react";
import { createElementClass, createModifierClass } from "../../../helpers";

export interface TableRowProps {
  isHeader: boolean;
}

export const TableRow: React.FunctionComponent<TableRowProps> = ({
  isHeader = false,
  children,
}) => (
  <tr className={createElementClass(`table-row${isHeader ? "-head" : ""}`)}>
    {children}
  </tr>
);
