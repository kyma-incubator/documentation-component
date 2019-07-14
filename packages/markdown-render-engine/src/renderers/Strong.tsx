import React from "react";
import { createElementClass } from "../helpers";

export const Strong: React.FunctionComponent = ({ children }) => (
  <strong className={createElementClass("strong")}>{children}</strong>
);
