import React from "react";
import { createElementClass, createModifierClass } from "../../../helpers";

export interface TableCellProps {
  align: "left" | "center" | "right" | "justify" | "char";
  isHeader: boolean;
}

export const TableCell: React.FunctionComponent<TableCellProps> = ({
  align,
  isHeader = false,
  children,
}) => {
  const createClassName = (type: string, align: string): string => {
    return `${createElementClass(type)} ${createModifierClass(align, type)}`;
  };

  return isHeader ? (
    <th className={createClassName("table-cell-head", align)} align={align}>
      {children}
    </th>
  ) : (
    <td className={createClassName("table-cell", align)} align={align}>
      {children}
    </td>
  );
};
