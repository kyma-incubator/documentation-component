import { PluginOptions } from "./Plugin";

export interface PluginOptionsForSource {
  name: string;
  options: PluginOptions;
}

export interface Source {
  type: string;
  rawContent: string;
  content?: string;
  data?: any;
}
export interface SourceWithPluginsOptions {
  source: Source;
  pluginsOptions?: PluginOptionsForSource[];
}

export type SourceGroup = Array<Source | SourceWithPluginsOptions>;
export interface SourceGroupWithPluginsOptions {
  sources: SourceGroup;
  pluginsOptions?: PluginOptionsForSource[];
}

export type Sources = Array<
  | Source
  | SourceWithPluginsOptions
  | SourceGroup
  | SourceGroupWithPluginsOptions
>;
export type PureSources = Array<Source | Source[]>;
