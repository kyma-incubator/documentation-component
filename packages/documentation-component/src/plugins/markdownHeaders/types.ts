import { Source } from "../../interfaces";

export interface Header {
  title: string;
  id: string;
  level: number;
  parent?: Header;
  children?: Header[];
}

export interface ExtractHeadersPluginOptions {
  headerPrefix?: ((source: Source) => string) | string;
  customNodes?: Array<((source: Source) => string) | string>;
  startWith?: number;
}

export interface ActiveAnchors {
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
}
