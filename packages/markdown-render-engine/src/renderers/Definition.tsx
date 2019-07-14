import React from "react";
import { createElementClass } from "../helpers";

export const Definition: React.FunctionComponent = ({ children }) => (
  <div className={createElementClass("definition")}>{children}</div>
);
