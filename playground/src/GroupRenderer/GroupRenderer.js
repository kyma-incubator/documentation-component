import React from "react";
import { RenderedContent } from "@kyma-project/documentation-component";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { HeadersNavigation } from "./Navigation";

export const GroupRenderer = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>AsyncAPI</Tab>
        <Tab>OData</Tab>
        <Tab>OpenAPI</Tab>
        <Tab>Markdown</Tab>
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
};
