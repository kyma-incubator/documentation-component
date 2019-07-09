import { Source } from "./Source";

export interface RenderEngine {
  sourceTypes: string[];
  component: React.ReactNode;
}

export interface RenderEngineWithOptions<T = any> {
  renderEngine: RenderEngine;
  options?: T;
}
export interface RenderEngineProps<T = any> {
  source: Source;
  options?: T;
}
