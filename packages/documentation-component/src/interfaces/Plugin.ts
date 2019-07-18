import { Source } from "./Source";

export interface Plugin {
  name: string;
  type: PluginType;
  sourceTypes: string[];
  fn: ExtractorPlugin | MutationPlugin;
}

export enum PluginType {
  EXTRACTOR = "extractor",
  MUTATION = "mutation",
}

export type PluginOptions<T = any> = T;

export interface PluginWithOptions<T = any> {
  plugin: Plugin;
  options: PluginOptions<T>;
}

export interface ExtractorPluginReturnType {
  [key: string]: any;
}
export interface ExtractorPluginArgs<T = any, C = string> {
  source: Source<C>;
  options?: PluginOptions<T>;
}
export type ExtractorPlugin = (
  args: ExtractorPluginArgs,
) => ExtractorPluginReturnType;

export type MutationPluginReturnType = string | any;
export interface MutationPluginArgs<T = any> {
  source: Source;
  options?: PluginOptions<T>;
}
export type MutationPlugin = (
  args: MutationPluginArgs,
) => MutationPluginReturnType;

export type PluginT = Plugin | PluginWithOptions;
export type Plugins = PluginT[];

export function isPlugin(plugin: PluginT): plugin is Plugin {
  return !Boolean((plugin as PluginWithOptions).plugin);
}

export function isPluginWithOptions(
  plugin: PluginT,
): plugin is PluginWithOptions {
  return Boolean((plugin as PluginWithOptions).plugin);
}
