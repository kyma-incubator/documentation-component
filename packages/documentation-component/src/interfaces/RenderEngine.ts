import { Source } from "./Source";

export interface RenderEngine {
  name: string;
  component: React.ReactNode;
  sourceTypes: string[];
}

export type RenderEngineOptions = Record<string, any>;

export interface RenderEngineWithOptions {
  renderEngine: RenderEngine;
  options: RenderEngineOptions;
}

export type RenderEngineType = RenderEngine | RenderEngineWithOptions;
export type RenderEngines = RenderEngineType[];

export interface RenderEngineProps<C = string> {
  source: Source<C>;
  options?: RenderEngineOptions;
}

export function isRenderEngine(
  renderEngine: RenderEngineType,
): renderEngine is RenderEngine {
  return !Boolean((renderEngine as RenderEngineWithOptions).options);
}

export function isRenderEngineWithOptions(
  renderEngine: RenderEngineType,
): renderEngine is RenderEngineWithOptions {
  return Boolean((renderEngine as RenderEngineWithOptions).options);
}
