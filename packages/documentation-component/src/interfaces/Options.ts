import { Plugins } from "./Plugin";
import { Sources } from "./Source";
import { RenderEngines } from "./RenderEngine";

export interface Options<C = string> {
  sources: Sources<C>;
  renderEngines: RenderEngines;
  plugins?: Plugins;
}
