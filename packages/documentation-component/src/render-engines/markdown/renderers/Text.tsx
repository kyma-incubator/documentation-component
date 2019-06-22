import React from "react";
import { createElementClass } from "../../../helpers";

export const Text: React.FunctionComponent = ({ children }) => (
  <span className={createElementClass("text")}>{children}</span>
);
