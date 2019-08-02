import {
  PluginOptions,
  MutationPluginArgs,
} from "@kyma-project/documentation-component";

function fn(source: string, options: PluginOptions): string {
  // logic

  return "";
}

export const mutationPlugin = ({
  source,
  options = {},
}: MutationPluginArgs): string =>
  fn((source.content || source.rawContent) as string, options);
