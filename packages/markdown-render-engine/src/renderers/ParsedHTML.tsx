import React from "react";

export interface ParsedHTMLProps {
  element: any;
}

export const ParsedHTML: React.FunctionComponent<ParsedHTMLProps> = ({
  element,
}) => <>{element}</>;
