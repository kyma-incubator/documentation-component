import React from "react";
import { RenderEngineProps } from "@kyma-project/documentation-component";
import OData, { ODataProps } from "@kyma-project/odata-react";

export const ODataRenderEngine: React.FunctionComponent<
  RenderEngineProps<ODataProps>
> = ({ source, options = {} }) => (
  <OData schema={source.content || source.rawContent} {...options} />
);
