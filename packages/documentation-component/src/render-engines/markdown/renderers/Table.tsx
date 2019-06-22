import React from "react";
import { createElementClass, createModifierClass } from "../../../helpers";

export const Table: React.FunctionComponent = ({ children }) => (
  <table className={createElementClass("table")}>{children}</table>
);
