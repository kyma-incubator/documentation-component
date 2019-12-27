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
    .map(source => {
      if (source.data) {
        return (
          <React.Fragment key={source.data.renderedContent}>
            {source.data.renderedContent}
          </React.Fragment>
        );
      }
      return null;
    });

  return <>{renderedContents}</>;
};
