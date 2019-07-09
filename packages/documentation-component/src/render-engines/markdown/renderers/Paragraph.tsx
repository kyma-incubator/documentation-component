import React from "react";
import { createElementClass } from "../../../helpers";

export const Paragraph: React.FunctionComponent = ({ children }) => (
  <p className={createElementClass("paragraph")}>{children}</p>
);
