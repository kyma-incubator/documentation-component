import React from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import HtmlToReact from "html-to-react";
// @ts-ignore
import htmlParser from "react-markdown/plugins/html-parser";
import * as Components from "./renderers";
import { Renderers, MarkdownRenderEngineOptions } from "./types";

function parser({ parsers = [], ...others }: MarkdownRenderEngineOptions) {
  const isValidNode = (node: any) => node.type !== "script";
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  return htmlParser({
    isValidNode,
    processingInstructions: [
      ...parsers.map(p => p({ parsers, ...others })),
      {
        // Anything else
        shouldProcessNode: (node: any) => true,
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ],
  });
}

export const MarkdownComponent: React.FunctionComponent<
  MarkdownRenderEngineOptions
> = ({
  source,
  escapeHtml = false,
  skipHtml = false,
  customRenderers = {},
  parsers = [],
  highlightTheme = null,
  headingPrefix = "",
  copyButton = null,
}) => {
  if (!source) return null;
  const headings: Set<string> = new Set<string>();

  const defaultRenderers: Renderers = {
    root: Components.Root,
    text: Components.Text,
    break: Components.Break,
    paragraph: Components.Paragraph,
    emphasis: Components.Emphasis,
    strong: Components.Strong,
    thematicBreak: Components.ThematicBreak,
    blockquote: Components.Blockquote,
    delete: Components.Delete,
    link: Components.Link,
    linkReference: Components.Link,
    image: Components.Image,
    imageReference: Components.Image,
    table: Components.Table,
    tableHead: Components.TableHead,
    tableBody: Components.TableBody,
    tableRow: Components.TableRow,
    tableCell: Components.TableCell,
    list: Components.List,
    listItem: Components.ListItem,
    definition: Components.Definition,
    heading: (props: any) => (
      <Components.Heading
        {...props}
        headingPrefix={headingPrefix}
        headings={headings}
      />
    ),
    inlineCode: Components.InlineCode,
    code: (props: any) => (
      <Components.Code
        {...props}
        highlightTheme={highlightTheme}
        copyButton={copyButton}
      />
    ),
    html: Components.HTML,
    virtualHtml: Components.VirtualHTML,
    parsedHtml: Components.ParsedHTML,
  };
  const renderers = { ...defaultRenderers, ...customRenderers };

  // temporary solution for passing custom props to heading components
  renderers.heading = (props: any) =>
    customRenderers.heading ? (
      <customRenderers.heading
        {...props}
        headingPrefix={headingPrefix}
        headings={headings}
      />
    ) : (
      <Components.Heading
        {...props}
        headingPrefix={headingPrefix}
        headings={headings}
      />
    );

  const astPlugins = [
    parser({
      parsers,
      customRenderers,
      highlightTheme,
      headingPrefix,
      copyButton,
    }),
  ];

  return (
    <ReactMarkdown
      source={source}
      escapeHtml={escapeHtml}
      skipHtml={skipHtml}
      renderers={renderers}
      astPlugins={astPlugins}
    />
  );
};
