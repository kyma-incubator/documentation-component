import React from "react";
import { useGroupContext } from "./groupProvider";

export interface RenderedContentProps {
  sourceTypes: string[];
}

export const RenderedContent: React.FunctionComponent<RenderedContentProps> = ({
  sourceTypes = [],
}) => {
  const { sources } = useGroupContext();

  if (!sources || !sources.length) {
    return null;
  }

  const renderedContents = sources
    .filter(source => sourceTypes.includes(source.type))
    .map(source => source.data.renderedContent);

  return <>{renderedContents}</>;
};
