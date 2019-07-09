import React from "react";
import { Markdown } from "./Markdown";
import { MarkdownRenderEngineOptions } from "./types";
import { RenderEngineProps } from "../../interfaces";

export const MarkdownRenderEngine: React.FunctionComponent<
  RenderEngineProps<MarkdownRenderEngineOptions>
> = ({ source, options = {} }) => {
  let hp: string = "";
  if (typeof options.headingPrefix === "function") {
    hp = options.headingPrefix(source);
  } else {
    hp = options.headingPrefix ? options.headingPrefix : "";
  }

  return (
    <Markdown
      source={source.content ? source.content : source.rawContent}
      {...options}
      headingPrefix={hp}
      key={hp}
    />
  );
};
