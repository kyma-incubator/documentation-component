import React from "react";

import { DC, Content, Sources } from "@kyma-project/documentation-component";
import {
  markdownRenderEngine,
  plugins as markdownPlugins,
} from "@kyma-project/dc-markdown-render-engine";
import { asyncApiRenderEngine } from "@kyma-project/dc-async-api-render-engine";
import { odataRenderEngine } from "@kyma-project/dc-odata-render-engine";
import { openApiRenderEngine } from "@kyma-project/dc-open-api-render-engine";

import { GroupRenderer } from "./GroupRenderer/GroupRenderer";
import { sources as SOURCES } from "./mocks";

import "@kyma-project/asyncapi-react/lib/styles/fiori.css";
import "@kyma-project/dc-markdown-render-engine/lib/styles.css";
import "@kyma-project/dc-open-api-render-engine/lib/styles.css";
import "@kyma-project/odata-react/lib/styles.css";

import "fiori-fundamentals/dist/fiori-fundamentals.css";
import "./index.css";

const RENDER_ENGINES = [
  markdownRenderEngine,
  asyncApiRenderEngine,
  odataRenderEngine,
  openApiRenderEngine,
];
const PLUGINS = [
  markdownPlugins.frontmatterMutationPlugin,
  markdownPlugins.headersExtractorPlugin,
];
const RENDERERS = {
  group: GroupRenderer,
};

export const App = () => (
  <DC.Provider
    sources={SOURCES as Sources<any>}
    renderEngines={RENDER_ENGINES}
    plugins={PLUGINS}
  >
    <Content renderers={RENDERERS} />
  </DC.Provider>
);
