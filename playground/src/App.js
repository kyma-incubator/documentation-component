import React from "react";

import { DC, Content } from "@kyma-project/documentation-component";
import {
  markdownRenderEngine,
  plugins as markdownPlugins,
} from "@kyma-project/dc-markdown-render-engine";
import { asyncApiRenderEngine } from "@kyma-project/dc-async-api-render-engine";
import { odataRenderEngine } from "@kyma-project/dc-odata-render-engine";
import { openApiRenderEngine } from "@kyma-project/dc-open-api-render-engine";

import { GroupRenderer } from "./GroupRenderer/GroupRenderer";
import { sources as SOURCES } from "./mocks";

// import "fiori-fundamentals/dist/fonts.min.css";

import "fiori-fundamentals/dist/fiori-fundamentals.css";

import "@kyma-project/dc-odata-render-engine/lib/styles.css";
import "@kyma-project/dc-markdown-render-engine/lib/styles.css";
import "@kyma-project/dc-open-api-render-engine/lib/styles.css";

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
    sources={SOURCES}
    renderEngines={RENDER_ENGINES}
    plugins={PLUGINS}
  >
    <Content renderers={RENDERERS} />
  </DC.Provider>
);
