import { Source } from "./Source";

export type Plugin = {
  type: PluginType;
  allowedSourceType: string[];
  fun: ExtractorPlugin | MutationPlugin | ParserPlugin;
};

export enum PluginType {
  EXTRACTOR = "extractor",
  MUTATION = "mutation",
  PARSER = "parser",
}

export type ExtractorPluginReturnType = { [key: string]: any };
export type ExtractorPlugin = (source: Source) => ExtractorPluginReturnType;

export type MutationPluginName = "mutation";
export type MutationPluginReturnType = string;
export type MutationPlugin = (source: Source) => MutationPluginReturnType;

export type ParserPluginName = "parser";
export type ParsersPluginReturnType = {
  replaceChildren?: boolean;
  shouldProcessNode: (node: any) => React.ReactNode;
  processNode: (node: any, children: any, index: number) => React.ReactNode;
};
export type ParserPlugin = () => ParsersPluginReturnType;
