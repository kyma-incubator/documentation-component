import React from "react";
import { useContext } from "../../common";
import ReactMarkdown from "react-markdown";
//@ts-ignore
import HtmlToReact from "html-to-react";
//@ts-ignore
import htmlParser from "react-markdown/plugins/html-parser";
import * as Components from "./renderers";
import { Renderers, MarkdownParserPlugin, MarkdownRenderEngineOptions } from "./types";

function parser({
  customRenderers = {},
  parsers = [],
}: MarkdownRenderEngineOptions) {
  const isValidNode = (node: any) => node.type !== "script";
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  return htmlParser({
    isValidNode,
    processingInstructions: [
      ...parsers.map(p => p({ parsers, customRenderers })),
      {
        // Anything else
        shouldProcessNode: (node: any) => true,
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ],
  });
};

export const Markdown: React.FunctionComponent<MarkdownRenderEngineOptions> = ({
  source,
  escapeHtml = false,
  skipHtml = false,
  customRenderers = {},
  parsers = [],
}) => {
  if (!source) return null;

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
    heading: Components.Heading,
    inlineCode: Components.InlineCode,
    code: Components.Code,
    html: Components.HTML,
    virtualHtml: Components.VirtualHTML,
    parsedHtml: Components.ParsedHTML,
  };

  const astPlugins = [parser({ parsers, customRenderers })]

  return (
    <ReactMarkdown
      source={source}
      escapeHtml={escapeHtml}
      skipHtml={skipHtml}
      renderers={{ ...defaultRenderers, ...customRenderers }}
      astPlugins={astPlugins}
    />
  );
};
