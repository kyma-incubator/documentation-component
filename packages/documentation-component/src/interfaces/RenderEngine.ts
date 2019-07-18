import { Source } from "./Source";

export interface RenderEngine {
  name: string;
  component: React.ReactNode;
  sourceTypes: string[];
}

export type RenderEngineOptions<T = Record<string, any>> = T;

export interface RenderEngineWithOptions<T = Record<string, any>> {
  renderEngine: RenderEngine;
  options: RenderEngineOptions<T>;
}

export type RenderEngineType = RenderEngine | RenderEngineWithOptions;
export type RenderEngines = RenderEngineType[];

export interface RenderEngineProps<T = Record<string, any>, C = string> {
  source: Source<C>;
  options?: RenderEngineOptions<T>;
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
