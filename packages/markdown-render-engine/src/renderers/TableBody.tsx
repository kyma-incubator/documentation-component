import React from "react";
import { createElementClass } from "../helpers";

export const TableBody: React.FunctionComponent = ({ children }) => (
  <tbody className={createElementClass("table-body")}>{children}</tbody>
);
