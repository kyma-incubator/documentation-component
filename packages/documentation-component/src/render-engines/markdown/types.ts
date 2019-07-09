import { ReactType } from "react";
import { ReactMarkdownProps, NodeType } from "react-markdown";
import { Source } from "../../interfaces";

export interface MarkdownRenderEngineOptions extends ReactMarkdownProps {
  parsers?: MarkdownParserPlugin[];
  customRenderers?: Partial<Renderers>;
  highlightTheme?: any;
  headingPrefix?: string | ((source: Source) => string);
  copyButton?: React.ReactNode;
}

export type Renderers = { [key in NodeType | "parsedHtml"]: ReactType };
export interface MarkdownParserPluginReturnType {
  replaceChildren?: boolean;
  shouldProcessNode: (node: any) => React.ReactNode;
  processNode: (node: any, children: any, index: number) => React.ReactNode;
}
export type MarkdownParserPlugin = (
  args: MarkdownRenderEngineOptions,
) => MarkdownParserPluginReturnType;
