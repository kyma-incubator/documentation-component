import { Source, PureSources } from "./Source";
import { RenderEngineWithOptions } from "./RenderEngine";

export interface Context {
  sources: PureSources;
  renderEngines: RenderEngineWithOptions[];
}
