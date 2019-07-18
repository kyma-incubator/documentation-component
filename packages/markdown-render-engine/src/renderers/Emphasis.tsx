import React from "react";
import { createElementClass } from "../helpers";

export const Emphasis: React.FunctionComponent = ({ children }) => (
  <em className={createElementClass("emphasis")}>{children}</em>
);
