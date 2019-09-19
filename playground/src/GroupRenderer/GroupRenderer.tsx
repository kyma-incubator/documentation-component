import React from "react";
import { RenderedContent } from "@kyma-project/documentation-component";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { HeadersNavigation } from "./Navigation";

const renderers = ["AsyncAPI", "OData", "OpenAPI", "Markdown"];

export const GroupRenderer = () => (
  <Tabs>
    <TabList>
      {renderers.map(el => (
        <Tab key={el} className="tab">
          {el}
        </Tab>
      ))}
    </TabList>

    <TabPanel>
      <RenderedContent sourceTypes={["asyncapi"]} />
    </TabPanel>
    <TabPanel>
      <RenderedContent sourceTypes={["odata"]} />
    </TabPanel>
    <TabPanel>
      <RenderedContent sourceTypes={["openapi"]} />
    </TabPanel>
    <TabPanel>
      <hr />
      <HeadersNavigation />
      <hr />
      <RenderedContent sourceTypes={["markdown"]} />
    </TabPanel>
  </Tabs>
);
