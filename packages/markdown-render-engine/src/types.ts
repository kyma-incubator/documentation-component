import { ReactType } from "react";
import { Source } from "@kyma-project/documentation-component";
import { ReactMarkdownProps, NodeType } from "react-markdown";

export type HeadingPrefix = string | ((source: Source) => string);

export type MarkdownRenderEngineOptions = ReactMarkdownProps & {
  prefixClassName?: string;
  parsers?: MarkdownParserPlugin[];
  customRenderers?: Partial<Renderers>;
  highlightTheme?: any;
  headingPrefix?: HeadingPrefix;
  copyButton?: React.ReactNode;
};

export type Renderers = { [key in NodeType | "parsedHtml"]: ReactType };

export interface MarkdownParserPluginReturnType {
  replaceChildren?: boolean;
  shouldProcessNode: (node: any) => React.ReactNode;
  processNode: (node: any, children: any, index: number) => React.ReactNode;
}

export type MarkdownParserPlugin = (
  args: MarkdownRenderEngineOptions,
) => MarkdownParserPluginReturnType;
