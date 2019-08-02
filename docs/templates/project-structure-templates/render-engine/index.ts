import { RenderEngine } from "@kyma-project/documentation-component";
import { Render_engine_nameRenderEngine } from "./renderEngine";
import * as plugins from "./plugins";
import * as types from "./types";

const render_engine_nameRenderEngine: RenderEngine = {
  name: "render_engine_name-render-engine",
  component: Render_engine_nameRenderEngine,
  sourceTypes: ["some_specification"],
};

export { render_engine_nameRenderEngine, plugins, types };
