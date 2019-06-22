export type RenderEngine = {
  sourceTypes: string[];
  component: React.ReactNode;
}

export type RenderEngineOptions = { [key: string]: any };
export type RenderEngineWithOptions = {
  renderEngine: RenderEngine;
  options?: RenderEngineOptions;
}