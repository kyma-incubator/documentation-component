import React from "react";
import "react-tabs/style/react-tabs.scss";
import { DC, Content } from "@kyma-project/documentation-component";

import { asyncapiSpecMock } from "./asyncapi";
import { odatamock } from "./odata";
import { openapiMock } from "./openapi";

import { markdownMock } from "./markdown";
import {
  markdownRenderEngine,
  plugins as markdownPlugins,
} from "@kyma-project/dc-markdown-render-engine";
import { asyncApiRenderEngine } from "@kyma-project/dc-async-api-render-engine";
import { odataRenderEngine } from "@kyma-project/dc-odata-render-engine";
import { openApiRenderEngine } from "@kyma-project/dc-open-api-render-engine";

import "fiori-fundamentals/dist/fiori-fundamentals.min.css";

import "@kyma-project/dc-odata-render-engine/lib/styles.css";
import "@kyma-project/dc-markdown-render-engine/lib/styles.css";
import "@kyma-project/dc-open-api-render-engine/lib/styles.css";

const SOURCES = [
  {
    source: {
      type: "md",
      rawContent: markdownMock,
    },
  },
  {
    source: {
      type: "asyncapi",
      rawContent: asyncapiSpecMock,
    },
  },
  {
    source: {
      type: "odata",
      rawContent: odatamock,
    },
  },
  {
    source: {
      type: "openapi",
      rawContent: openapiMock,
    },
  },
];

const RENDER_ENGINES = [
  markdownRenderEngine,
  asyncApiRenderEngine,
  odataRenderEngine,
  openApiRenderEngine,
];
const PLUGINS = [markdownPlugins.frontmatterMutationPlugin];

export const App = () => (
  <div id="sth">
    <DC.Provider
      sources={SOURCES}
      renderEngines={RENDER_ENGINES}
      plugins={PLUGINS}
    >
      <Content />
    </DC.Provider>
  </div>
);
