import grayMatter from "gray-matter";
import mapValues from "lodash.mapvalues";
import isDate from "lodash.isdate";

import {
  Source,
  ExtractorPluginArgs,
  ExtractorPluginReturnType,
} from "../../interfaces";

export const extractFrontmatter = ({
  source,
  options,
}: ExtractorPluginArgs): ExtractorPluginReturnType => {
  try {
    const data = grayMatter(source.rawContent, options);
    if (data.data) {
      data.data = mapValues(data.data, (value: any) => {
        if (isDate(value)) {
          return value.toJSON();
        }
        return value;
      });
    }

    return {
      frontmatter: {
        title: "", // always include a title
        ...data.data,
      },
    };
  } catch (e) {
    return {};
  }
};
