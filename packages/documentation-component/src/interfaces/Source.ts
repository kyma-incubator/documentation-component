import { PluginOptions } from "./Plugin";
import { RenderEngineOptions } from "./RenderEngine";

export interface PluginOptionsForSource<T = any> {
  name: string;
  options: PluginOptions<T>;
}

export interface RenderEngineOptionsForSource<T = any> {
  name: string;
  options: RenderEngineOptions<T>;
}

export interface Source {
  type: string;
  rawContent: string | any;
  content?: string | any;
  data?: any;
}

export interface SourceWithOptions {
  source: Source;
  pluginsOptions?: PluginOptionsForSource[];
  renderEngineOptions?: RenderEngineOptionsForSource[];
}

export interface SourceGroupWithOptions {
  sources: SourceWithOptions[];
  pluginsOptions?: PluginOptionsForSource[];
  renderEngineOptions?: RenderEngineOptionsForSource[];
}

export type SourceType = SourceWithOptions | SourceGroupWithOptions;
export type Sources = SourceType[];

export function isSourceWithOptions(
  source: SourceType,
): source is SourceWithOptions {
  return Boolean((source as SourceWithOptions).source);
}

export function isSourceGroupWithOptions(
  source: SourceType,
): source is SourceGroupWithOptions {
  return Boolean((source as SourceGroupWithOptions).sources);
}

export type PureSourceType = Source | Source[];
export type PureSources = PureSourceType[];

export function isSource(source: PureSourceType): source is Source {
  return !Array.isArray(source);
}

export function isSourceArray(source: PureSourceType): source is Source[] {
  return Array.isArray(source);
}
