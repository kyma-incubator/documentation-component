import { Source } from "./Source";

export type Plugin = {
  name: string;
  type: PluginType;
  sourceTypes: string[];
  fun: ExtractorPlugin | MutationPlugin;
};

export enum PluginType {
  EXTRACTOR = "extractor",
  MUTATION = "mutation",
}

export type PluginOptions = { [key: string]: any };

export type ExtractorPluginReturnType = { [key: string]: any };
export type ExtractorPluginArgs = {
  source: Source;
  options?: PluginOptions;
}
export type ExtractorPlugin = (args: ExtractorPluginArgs) => ExtractorPluginReturnType;

export type MutationPluginReturnType = string;
export type MutationPluginArgs = {
  source: Source;
  options?: PluginOptions;
}
export type MutationPlugin = (args: MutationPluginArgs) => MutationPluginReturnType;
