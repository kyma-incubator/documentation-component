import { Source, PluginOptions, ExtractorPluginArgs, ExtractorPluginReturnType } from "@kyma-project/documentation-component";

function fn(source: Source, options: PluginOptions): ExtractorPluginReturnType {
  // logic
}

export const extractorPlugin = ({
  source,
  options = {},
}: ExtractorPluginArgs): ExtractorPluginReturnType =>
  fn(source, options);
  