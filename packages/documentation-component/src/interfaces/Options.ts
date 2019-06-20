import { Plugin } from "./Plugin";
import { Source } from "./Source";
import { Renderers } from "../components/Markdown";

export interface Options {
  sources: Source[];
  plugins?: Plugin[];
  customRenderers?: Partial<Renderers>;
}
