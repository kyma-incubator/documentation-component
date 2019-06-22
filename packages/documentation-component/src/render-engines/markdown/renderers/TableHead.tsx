import React from "react";
import { createElementClass, createModifierClass } from "../../../helpers";

export const TableHead: React.FunctionComponent = ({ children }) => (
  <thead className={createElementClass("table-head")}>{children}</thead>
);
