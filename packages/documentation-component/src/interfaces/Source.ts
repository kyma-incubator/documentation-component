import { PluginOptions } from "./Plugin";
import { RenderEngineOptions } from "./RenderEngine";

export interface PluginOptionsForSource<T = any> {
  name: string;
  options: PluginOptions;
}

export interface RenderEngineOptionsForSource<T = any> {
  name: string;
  options: RenderEngineOptions;
}

export interface Source<C = string> {
  type: string;
  rawContent: C;
  content?: C;
  data?: Record<string, any>;
}

export interface SourceWithOptions<C = string> {
  source: Source<C>;
  pluginsOptions?: PluginOptionsForSource[];
  renderEngineOptions?: RenderEngineOptionsForSource[];
}

export interface SourceGroupWithOptions<C = string> {
  sources: Array<SourceWithOptions<C>>;
  pluginsOptions?: PluginOptionsForSource[];
  renderEngineOptions?: RenderEngineOptionsForSource[];
}

export type SourceType<C = string> =
  | SourceWithOptions<C>
  | SourceGroupWithOptions<C>;
export type Sources<C = string> = Array<SourceType<C>>;

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

export type PureSourceType<C = string> = Source<C> | Array<Source<C>>;
export type PureSources<C = string> = Array<PureSourceType<C>>;

export function isSource(source: PureSourceType): source is Source {
  return !Array.isArray(source);
}

export function isSourceArray(source: PureSourceType): source is Source[] {
  return Array.isArray(source);
}
