import React from "react";
import {
  Source,
  RenderEngineProps,
} from "@kyma-project/documentation-component";
import { MarkdownComponent } from "./MarkdownComponent";
import { MarkdownRenderEngineOptions, HeadingPrefix } from "./types";

function resolveHeadingPrefix(
  source: Source,
  headingPrefix?: HeadingPrefix,
): string {
  let hp: string = "";
  if (typeof headingPrefix === "function") {
    hp = headingPrefix(source);
  } else {
    hp = headingPrefix ? headingPrefix : "";
  }

  return hp;
}

export const MarkdownRenderEngine: React.FunctionComponent<
  RenderEngineProps<MarkdownRenderEngineOptions>
> = ({ source, options = {} }) => {
  const headingPrefix = resolveHeadingPrefix(source, options.headingPrefix);

  return (
    <MarkdownComponent
      {...options}
      source={(source.content || source.rawContent) as string}
      headingPrefix={headingPrefix}
      key={headingPrefix}
    />
  );
};
