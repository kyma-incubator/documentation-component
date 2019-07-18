import React from "react";
import { plugins } from "@kyma-project/dc-markdown-render-engine";
import { RenderedHeader } from "./RenderedHeader";
import { postProcessingHeaders } from "../helpers";
import { HeadersNavigationsWrapper, StyledHeadersNavigation } from "./styled";

const HN = plugins.HeadersNavigation;

export const HeadersNavigation: React.FunctionComponent = () => (
  <HeadersNavigationsWrapper>
    <div>
      <HN postProcessing={postProcessingHeaders}>
        <StyledHeadersNavigation className="cms__toc-wrapper">
          <RenderedHeader />
        </StyledHeadersNavigation>
      </HN>
    </div>
  </HeadersNavigationsWrapper>
);
