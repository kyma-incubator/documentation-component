import React from "react";
import { RenderEngineProps } from "@kyma-project/documentation-component";
import AsyncApi from "@kyma-project/asyncapi-react";

import { AsyncApiProps } from "./types";

export const AsyncApiRenderEngine: React.FunctionComponent<RenderEngineProps<
  AsyncApiProps,
  string | {}
>> = ({ source, options = {} }) => (
  <AsyncApi schema={source.content || source.rawContent} {...options} />
);
