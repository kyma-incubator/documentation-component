import { Source } from "./Source";

export interface Plugin {
  name: string;
  type: PluginType;
  sourceTypes: string[];
  fun: ExtractorPlugin | MutationPlugin;
}

export enum PluginType {
  EXTRACTOR = "extractor",
  MUTATION = "mutation",
}

export type PluginOptions<T = any> = T;

export interface ExtractorPluginReturnType {
  [key: string]: any;
}
export interface ExtractorPluginArgs<T = any> {
  source: Source;
  options?: PluginOptions<T>;
}
export type ExtractorPlugin = (
  args: ExtractorPluginArgs,
) => ExtractorPluginReturnType;

export type MutationPluginReturnType = string;
export interface MutationPluginArgs<T = any> {
  source: Source;
  options?: PluginOptions<T>;
}
export type MutationPlugin = (
  args: MutationPluginArgs,
) => MutationPluginReturnType;
