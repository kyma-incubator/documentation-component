import {
  // Source,
  // PluginOptions,
  PluginType,
  MutationPluginReturnType,
  // MutationPlugin,
  SourceWithOptions,
  MutationPluginArgs,
  ExtractorPluginArgs,
  ExtractorPluginReturnType,
  PluginWithOptions,
  Plugin,
} from "../../interfaces";
export const returnObjectInExtractorPlugin = "returnObjectInExtractorPlugin";
export const testMarkdown = `
  > **NOTE**: Sections with the asterisk sign (*) are optional.
  
  # Plugin Name
  
  Modify the plugin name and insert the name of your plugin. Use Heading 1 (H1).
  
  ## Overview
  
  Provide a description of the plugin functionality. For example, describe the resources types on which it is adapted.
  
  ## Prerequisites*
  
  > **NOTE**: Don't consider\`@kyma-project/documentation-component\` a prerequisite. 
  
  List the packages, including render engines, required to use the plugin. 
  
  ## Installation
  
  Explain the steps to install your plugin.
  
  ## Usage 
  
  ### Configuration*
  
  Create a table listing the available options for your plugin. Use the following table structure:
  
  | Name | Required | Type | Default value | Description |
  |---|---|---|---|---|
  | \`disableRelativeLinks\` | No | \`boolean\` | \`false\` | Disable relative links in markdown files |
  
  ## Development*
  
  Add instructions on how to develop the plugin. It must be clear what to do and how to trigger the tests.
  `;

export const pluginType = "testType";
export const trimSourceToThisChars = 20;
export const testDataWithOptionsString = "testDataWithOptions";
export const pluginSource: SourceWithOptions = {
  source: {
    rawContent: testMarkdown,
    type: pluginType,
  },
};

export interface TestPluginOptionsShape {
  testOption?: boolean;
}
export const testExtractorPlugin = ({
  source,
  options = {},
}: ExtractorPluginArgs<TestPluginOptionsShape>): ExtractorPluginReturnType => {
  // do any kind of operation, just to test whether options are correctly propagated

  const changedSource = source.rawContent.slice(0, trimSourceToThisChars);

  if (options.testOption) {
    return {
      testDataWithOptions: testDataWithOptionsString,
      src: changedSource,
    };
  }

  return { testData: returnObjectInExtractorPlugin, data: source.rawContent };
};

export const testMutationPlugin = ({
  source,
  options = {},
}: MutationPluginArgs<TestPluginOptionsShape>): MutationPluginReturnType => {
  // do any kind of operation, just to test whether options are correctly propagated

  const changedSource = source.rawContent.slice(0, trimSourceToThisChars);

  if (options.testOption) {
    return {
      testData: testDataWithOptionsString,
      src: changedSource,
    };
  }
  return { testData: "testData", data: source.rawContent };
};

export const testPluginName = "testName";

export const testPluginNoOptions: (
  extension: string,
) => Plugin = extension => ({
  name: testPluginName,
  type: PluginType.EXTRACTOR,
  sourceTypes: [extension],
  fn: testExtractorPlugin,
});

export const testPluginWithOptions: (
  extension: string,
) => PluginWithOptions = extension => ({
  plugin: {
    name: testPluginName,
    type: PluginType.EXTRACTOR,
    sourceTypes: [extension],
    fn: testExtractorPlugin,
  },
  options: { testOption: true },
});

export const blankPlugin: (extension: string) => Plugin = extension => ({
  name: "blankPlugin",
  type: PluginType.EXTRACTOR,
  sourceTypes: [extension],
  fn: testExtractorPlugin,
});
