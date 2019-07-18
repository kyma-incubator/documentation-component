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

export type PluginOptions = Record<string, any>;

export interface PluginWithOptions {
  plugin: Plugin;
  options: PluginOptions;
}

export interface ExtractorPluginReturnType {
  [key: string]: any;
}
export interface ExtractorPluginArgs<C = string> {
  source: Source<C>;
  options?: PluginOptions;
}
export type ExtractorPlugin = (
  args: ExtractorPluginArgs,
) => ExtractorPluginReturnType;

export type MutationPluginReturnType = string | any;
export interface MutationPluginArgs<C = string> {
  source: Source<C>;
  options?: PluginOptions;
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
