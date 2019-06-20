import React from "react";
import { createElementClass } from "../../../helpers";

export const Delete: React.FunctionComponent = ({ children }) => (
  <del className={createElementClass("delete")}>{children}</del>
);
