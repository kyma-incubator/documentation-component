import { RenderEngine } from "@kyma-project/documentation-component";
import { ODataRenderEngine } from "./renderEngine";

const odataApiRenderEngine: RenderEngine = {
  name: "async-api-render-engine",
  component: ODataRenderEngine,
  sourceTypes: ["odata"],
};

export { odataApiRenderEngine };
