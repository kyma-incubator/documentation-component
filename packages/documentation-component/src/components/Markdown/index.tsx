import React, { ReactType, useContext } from "react";
import { Context } from "../../containers";
import ReactMarkdown, {
  ReactMarkdownProps,
  NodeType,
  MdastPlugin,
} from "react-markdown";
//@ts-ignore
import HtmlToReact from "html-to-react";
//@ts-ignore
import htmlParser from "react-markdown/plugins/html-parser";
import * as Components from "./renderers";
import { replaceAllLessThanChars } from "../../helpers";
import { ParserPlugin } from "../../interfaces";

export type Renderers = { [key in NodeType | "parsedHtml"]: ReactType };

function parser(parsers: ParserPlugin[] = []) {
  const isValidNode = (node: any) => node.type !== "script";
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  return htmlParser({
    isValidNode,
    processingInstructions: [
      ...parsers.map(parser => parser()),
      {
        // Anything else
        shouldProcessNode: (node: any) => true,
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ],
  });
}

export interface MarkdownProps {
  customRenderers?: Partial<Renderers>;
  parsers?: ParserPlugin[];
}

export const Markdown: React.FunctionComponent<
  ReactMarkdownProps & MarkdownProps
> = ({
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

  return (
    <ReactMarkdown
      source={source}
      escapeHtml={escapeHtml}
      skipHtml={skipHtml}
      renderers={{ ...defaultRenderers, ...customRenderers }}
      astPlugins={[parser(parsers)]}
    />
  );
};
