import { ReactType } from "react";
import { ReactMarkdownProps, NodeType } from "react-markdown";

export interface MarkdownRenderEngineOptions extends ReactMarkdownProps {
  parsers: MarkdownParserPlugin[];
  customRenderers?: Partial<Renderers>;
}

export type Renderers = { [key in NodeType | "parsedHtml"]: ReactType };
export type MarkdownParserPluginReturnType = {
  replaceChildren?: boolean;
  shouldProcessNode: (node: any) => React.ReactNode;
  processNode: (node: any, children: any, index: number) => React.ReactNode;
};
export type MarkdownParserPlugin = (args: MarkdownRenderEngineOptions) => MarkdownParserPluginReturnType;
