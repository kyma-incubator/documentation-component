import React from "react";
import { createElementClass } from "../../../helpers";

export const Paragraph: React.FunctionComponent = ({ children }) => (
  <div className={createElementClass("paragraph")}>{children}</div>
);
