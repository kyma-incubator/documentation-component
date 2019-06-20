import React from "react";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab";
import { Markdown } from "../../components";

let tabsCounter = 0;

export const tabsParser = () => ({
  replaceChildren: true,
  shouldProcessNode: (node: any) =>
    node.type === "tag" &&
    node.name === "div" &&
    node.attribs &&
    node.attribs.hasOwnProperty("tabs"),
  processNode: (node: any) => {
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
            const source = childDetails.next.data;

            return (
              <Tab key={label} label={label}>
                <Markdown source={source} />
              </Tab>
            );
          }
        });
      }
    });

    return [<Tabs key={tabsCounter++}>{children}</Tabs>];
  },
});
