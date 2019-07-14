import React from "react";
import { createElementClass } from "../helpers";

export const Table: React.FunctionComponent = ({ children }) => (
  <table className={createElementClass("table")}>{children}</table>
);
