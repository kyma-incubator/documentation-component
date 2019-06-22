import React from "react";
import { createElementClass } from "../../../helpers";

export interface LinkProps {
  href: string;
}

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  children,
}) => {
  return (
    <a
      className={createElementClass("link")}
      href={href}
      target={href.startsWith("http") ? "_blank" : ""}
    >
      {children}
    </a>
  );
};
