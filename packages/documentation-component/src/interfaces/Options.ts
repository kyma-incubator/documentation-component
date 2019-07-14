import { Plugins } from "./Plugin";
import { Sources } from "./Source";
import { RenderEngines } from "./RenderEngine";

export interface Options {
  sources: Sources;
  renderEngines: RenderEngines;
  plugins?: Plugins;
}
