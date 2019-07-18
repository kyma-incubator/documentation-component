import React from "react";
import { CLASS_NAME_PREFIX } from "../constants";

export interface RootProps {
  className?: string;
}

export const Root: React.FunctionComponent<RootProps> = ({
  children,
  className,
}) => (
  <div className={`${CLASS_NAME_PREFIX}${className ? ` ${className}` : ""}`}>
    {children}
  </div>
);
