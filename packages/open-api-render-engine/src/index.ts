import { RenderEngine } from "@kyma-project/documentation-component";
import { OpenApiRenderEngine } from "./renderEngine";

const openApiRenderEngine: RenderEngine = {
  name: "open-api-render-engine",
  component: OpenApiRenderEngine,
  sourceTypes: ["open-api", "openapi", "swagger"],
};

export { openApiRenderEngine };
export * from "./types";
