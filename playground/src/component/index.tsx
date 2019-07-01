import React from "react";
import {
  HeadlessCMS,
  Content,
  markdownTabsMutationPlugin,
  markdownTabsParserPlugin,
  markdownRenderEngine,
  markdownHeadersPlugin,
  RenderedContent,
  frontmatterMutationPlugin,
  replaceAllLessThanCharsMutationPlugin,
  Tabs,
  Tab,
  disableInternalLinksMutationPlugin,
  MARKDOWN_HEADER_EXTRACTOR_PLUGIN,
  Sources,
  Source,
  HeadersNavigation,
} from "@kyma-project/documentation-component";
import {
  asyncApiRenderEngine,
  asyncApiOptions,
  MarkdownLink,
  highlightTheme,
  RenderedHeader,
  StyledHeadersNavigation,
} from "./render-engines";
import { replaceImagePathsMutationPlugin } from "./plugins";
import { headingPrefix, customNodes } from "./helpers";
import { MarkdownSingleRenderer } from "./renderers";

export interface DocsComponentProps {
  sources: Source[];
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
    <HeadlessCMS.Provider
      sources={[
        {
          sources,
          pluginsOptions: [
            {
              name: MARKDOWN_HEADER_EXTRACTOR_PLUGIN,
              options: {
                headerPrefix: headingPrefix,
                customNodes,
              },
            },
          ],
        },
      ]}
      plugins={[
        frontmatterMutationPlugin,
        replaceImagePathsMutationPlugin,
        replaceAllLessThanCharsMutationPlugin,
        markdownTabsMutationPlugin,
        // disableInternalLinksMutationPlugin,
        markdownHeadersPlugin,
      ]}
      renderEngines={[
        {
          renderEngine: markdownRenderEngine,
          options: {
            customRenderers: {
              link: MarkdownLink,
            },
            parsers: [markdownTabsParserPlugin],
            headingPrefix,
            highlightTheme,
            // copyButton: CopyButton,
          },
        },
        {
          renderEngine: asyncApiRenderEngine,
          options: {
            ...asyncApiOptions,
          },
        },
      ]}
    >
      <Content
        renderers={{
          single: [MarkdownSingleRenderer],
        }}
      />
      {navigation && (
        <HeadersNavigation>
          <StyledHeadersNavigation className={`cms__toc-wrapper`}>
            <RenderedHeader />
          </StyledHeadersNavigation>
        </HeadersNavigation>
      )}
    </HeadlessCMS.Provider>
  );
};
