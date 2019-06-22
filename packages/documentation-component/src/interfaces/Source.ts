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
};
export interface SourceWithPluginsOptions {
  source: Source;
  pluginsOptions?: PluginOptionsForSource[];
}

export type SourceGroup = (Source | SourceWithPluginsOptions)[];
export interface SourceGroupWithPluginsOptions {
  sources: SourceGroup;
  pluginsOptions?: PluginOptionsForSource[];
}

export type Sources = (Source | SourceWithPluginsOptions | SourceGroup | SourceGroupWithPluginsOptions)[];
export type PureSources = (Source | Source[])[];