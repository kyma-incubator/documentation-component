import React from "react";
import { DC, Content, Sources } from "@kyma-project/documentation-component";
import {
  markdownRenderEngine,
  plugins as markdownPlugins,
} from "@kyma-project/dc-markdown-render-engine";
import { asyncApiRenderEngine } from "@kyma-project/dc-async-api-render-engine";
import { openApiRenderEngine } from "@kyma-project/dc-open-api-render-engine";
import {
  replaceImagePathsMutationPlugin,
  disableInternalLinksParserPlugin,
} from "./plugins";
import { headingPrefix, customNodes } from "./helpers";
import { MarkdownSingleRenderer, GroupRenderer } from "./renderers";

export interface DocsComponentProps {
  sources: Sources;
  navigation?: boolean;
}

export const DocsComponent: React.FunctionComponent<DocsComponentProps> = ({
  sources,
  navigation = false,
}) => {
  if (!sources) {
    return null;
  }

  return (
    <DC.Provider
      sources={sources}
      plugins={[
        markdownPlugins.frontmatterMutationPlugin,
        replaceImagePathsMutationPlugin,
        markdownPlugins.replaceAllLessThanCharsMutationPlugin,
        markdownPlugins.tabsMutationPlugin,
        {
          plugin: markdownPlugins.headersExtractorPlugin,
          options: {
            headerPrefix: headingPrefix,
            customNodes,
          },
        },
      ]}
      renderEngines={[
        {
          renderEngine: markdownRenderEngine,
          options: {
            parsers: [
              markdownPlugins.tabsParserPlugin,
              disableInternalLinksParserPlugin,
            ],
            headingPrefix,
          },
        },
        asyncApiRenderEngine,
        openApiRenderEngine,
      ]}
    >
      <Content
        renderers={{
          single: [MarkdownSingleRenderer],
          group: GroupRenderer,
        }}
      />
    </DC.Provider>
  );
};
