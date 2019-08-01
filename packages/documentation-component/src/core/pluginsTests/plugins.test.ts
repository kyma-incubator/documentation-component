"use strict";
import { runPlugins, runPlugin, runMutation, runExtractor } from "../plugins";

import {
  pluginSource,
  testPluginNoOptions,
  testPluginWithOptions,
  blankPlugin,
  pluginType,
  testMarkdown,
  testMutationPlugin,
  testExtractorPlugin,
  trimSourceToThisChars,
  testDataWithOptionsString,
  returnObjectInExtractorPlugin,
} from "./mocks";

describe("Plugins tests", () => {
  describe("runPlugin", () => {
    test("should run plugin with NO config", () => {
      const testPluginData = pluginSource();

      const testData = runPlugin(
        testPluginData,
        testPluginNoOptions(pluginType),
      );
      const correct = {
        source: {
          data: {
            data: testMarkdown,
            testData: returnObjectInExtractorPlugin,
          },
          ...pluginSource().source,
        },
      };
      expect(testData).toEqual(correct);
    });

    test("should run plugin with config", () => {
      const testPluginData = pluginSource();
      const testData = runPlugin(
        testPluginData,
        testPluginWithOptions(pluginType),
      );

      const correct = {
        source: {
          data: {
            src: testMarkdown.slice(0, trimSourceToThisChars),
            testDataWithOptions: testDataWithOptionsString,
          },
          ...pluginSource().source,
        },
      };

      expect(testData).toEqual(correct);
    });

    test("should return source if source-plugin sourceTypes do not match", () => {
      const testPluginData = pluginSource();
      const typeThatDiffersBetweenSourceAndPlugin =
        pluginType
          .split("")
          .reverse()
          .join("") + "randomString";

      const testData = runPlugin(
        testPluginData,
        blankPlugin(typeThatDiffersBetweenSourceAndPlugin),
      );

      expect(testData).toEqual(pluginSource());
    });
  });
  describe("runMutation", () => {
    test("should return unmutated data when no options are specified", () => {
      const testPluginData = pluginSource();
      const testData = runMutation(testPluginData, testMutationPlugin);

      const correct = {
        source: {
          content: { testData: "testData", data: testMarkdown },
          ...pluginSource().source,
        },
      };

      expect(testData).toEqual(correct);
    });
    test("should return mutated data when options are specified", () => {
      const testPluginData = pluginSource();
      const testData = runMutation(testPluginData, testMutationPlugin, {
        testOption: "testOption",
      });

      const correct = {
        source: {
          content: {
            src: testMarkdown.slice(0, trimSourceToThisChars),
            testData: testDataWithOptionsString,
          },
          ...pluginSource().source,
        },
      };

      expect(testData).toEqual(correct);
    });
  });

  describe("runExtractor", () => {
    test("should return mocked data in source field", () => {
      const testPluginData = pluginSource();
      const testData = runExtractor(testPluginData, testExtractorPlugin);

      const correct = {
        source: {
          data: { testData: returnObjectInExtractorPlugin, data: testMarkdown },
          ...pluginSource().source,
        },
      };

      expect(testData).toEqual(correct);
    });

    test("should return correct data if options are specified", () => {
      const testPluginData = pluginSource();
      const testData = runExtractor(testPluginData, testExtractorPlugin, {
        testOption: true,
      });

      const correct = {
        source: {
          data: {
            [testDataWithOptionsString]: "testDataWithOptions",
            src: testMarkdown.slice(0, trimSourceToThisChars),
          },
          ...pluginSource().source,
        },
      };

      expect(testData).toEqual(correct);
    });
  });

  describe("runPlugins", () => {
    test("should return sources if no plugin is provided", () => {
      const pluginData = Array(10).fill(pluginSource());
      const testData = runPlugins(pluginData);

      const correct = Array(10).fill(pluginSource());
      expect(testData).toEqual(correct);
    });
    test("should return work without references", () => {
      const length = 10;
      const pluginData = Array(length).fill(pluginSource());

      const plugins = [
        testPluginNoOptions(pluginType),
        testPluginNoOptions(pluginType),
      ];
      const testData = runPlugins(pluginData, plugins);

      const correctItem = {
        source: {
          ...pluginSource().source,
          data: { data: testMarkdown, testData: returnObjectInExtractorPlugin },
        },
      };

      const correct = Array(length).fill(correctItem);

      expect(testData).toEqual(correct); // we need to inline this to, because run* functions are not pure
    });
  });
});
