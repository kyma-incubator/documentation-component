import { Source } from "../../interfaces";

export interface Header {
  title: string;
  id: string;
  level: number;
  children?: Header[];
}

export interface PluginOptions {
  headerPrefix?: string | ((source: Source) => string);
}