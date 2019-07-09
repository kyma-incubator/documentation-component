import { Plugin } from "./Plugin";
import { Sources } from "./Source";
import { RenderEngineWithOptions } from "./RenderEngine";

export interface Options {
  sources: Sources;
  renderEngines: RenderEngineWithOptions[];
  plugins?: Plugin[];
}
