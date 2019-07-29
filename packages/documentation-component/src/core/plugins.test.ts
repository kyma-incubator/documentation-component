import {
  runPlugins,
  // runPlugin,
  // runPluginForGroup,
  // runMutation,
  runExtractor,
} from "./plugins";

import {
  // Source,
  // PluginOptions,
  ExtractorPluginArgs,
  ExtractorPluginReturnType,
} from "../interfaces";

describe("Plugins tests", () => {
  describe("runPlugins", () => {
    test("should bla", () => {
      const data = runPlugins([
        {
          source: {
            type: "test",
            rawContent: "testData",
          },
        },
      ]);
      expect(data).toEqual(1);
    });
  });

  describe.only("runExtractor", () => {
    test("should return mocked data in source field", () => {
      const data = runExtractor(
        {
          source: { type: "testType", rawContent: testMarkdown },
        },
        testExtractorPlugin,
      );

      const correct = {
        source: {
          data: { testData: "testData" },
          type: "testType",
          rawContent: testMarkdown,
        },
      };

      expect(data).toEqual(correct);
    });

    test("should return correct data if options are specified", () => {
      const data = runExtractor(
        {
          source: { type: "testType", rawContent: testMarkdown },
        },
        testExtractorPlugin,
        { useOtherMock: true },
      );

      const correct = {
        source: {
          data: { testData: "testData" },
          type: "testType",
          rawContent: testMarkdown,
        },
      };

      expect(data).toEqual(correct);
    });
  });
});

const testMarkdown = `
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

interface TestExtractorPluginOptionsShape {
  testOption?: boolean;
}
export const testExtractorPlugin = ({
  source,
  options = {},
}: ExtractorPluginArgs<
  TestExtractorPluginOptionsShape
>): ExtractorPluginReturnType<string> => {
  if (options.testOption) {
    return "asd";
  }
  return "asd";
};
