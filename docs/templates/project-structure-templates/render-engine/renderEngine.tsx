import React from "react";
import { RenderEngineProps } from "@kyma-project/documentation-component";
import { SomeInterface } from "./types";

export const Render_engine_nameRenderEngine: React.FunctionComponent<
  RenderEngineProps<SomeInterface>
> = ({ source, options: { someField = "" } }) => {
  // ...logic

  return <></>;
};
