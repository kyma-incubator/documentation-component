import React from "react";
import { Source, RenderEngine, RenderEngineOptions } from "../../interfaces";
import { Markdown } from "./Markdown";
import { MarkdownRenderEngineOptions } from "./types";

export const MarkdownRenderEngine: React.FunctionComponent<MarkdownRenderEngineOptions> = (options) => {
  return <Markdown {...options} />
};
