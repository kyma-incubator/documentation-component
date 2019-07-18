import { RenderEngine } from "@kyma-project/documentation-component";
import { AsyncApiRenderEngine } from "./renderEngine";

const asyncApiRenderEngine: RenderEngine = {
  name: "async-api-render-engine",
  component: AsyncApiRenderEngine,
  sourceTypes: ["async-api", "asyncapi", "events"],
};

export { asyncApiRenderEngine };
export * from "./types";
