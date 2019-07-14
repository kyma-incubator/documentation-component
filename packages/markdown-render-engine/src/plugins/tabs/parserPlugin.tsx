import React from "react";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab";
import { MarkdownComponent } from "../..//MarkdownComponent";
import {
  MarkdownRenderEngineOptions,
  MarkdownParserPluginReturnType,
} from "../../types";

let tabsCounter = 0;
const blockquoteRegex = /(^( *>).*?\n)/gm;
const orderedListRegex = /^( *[0-9])+.(.*)/gm;

export const tabsParser = (
  args: MarkdownRenderEngineOptions,
): MarkdownParserPluginReturnType => ({
  replaceChildren: true,
  shouldProcessNode: (node: any) =>
    node.type === "tag" &&
    node.name === "div" &&
    node.attribs &&
    node.attribs.hasOwnProperty("tabs"),
  processNode: (node: any) => {
    if (!node.children) {
      return null;
    }

    const children = node.children.map((child: any) => {
      if (child.type === "tag" && child.name === "details" && child.children) {
        return child.children.map((childDetails: any) => {
          if (
            childDetails.type === "tag" &&
            childDetails.name === "summary" &&
            childDetails.children.length === 1 &&
            childDetails.children[0].type === "text" &&
            childDetails.next &&
            childDetails.next.data
          ) {
            const label = childDetails.children[0].data;
            const source = childDetails.next.data
              .replace(
                blockquoteRegex,
                (blockquote: string) => `${blockquote}\n`,
              )
              .replace(
                orderedListRegex,
                (listElement: string) => `\n${listElement}\n`,
              );

            return (
              <Tab key={label} label={label}>
                <MarkdownComponent source={source} {...args} />
              </Tab>
            );
          }
          return null;
        });
      }
    });

    return [<Tabs key={tabsCounter++}>{children}</Tabs>];
  },
});
