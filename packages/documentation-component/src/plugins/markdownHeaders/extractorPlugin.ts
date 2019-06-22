import { Source, ExtractorPluginReturnType, ExtractorPluginArgs } from "../../interfaces";
import { Header, PluginOptions } from "./types";

const headingRegex = /\n(#+\s*)(.*)/g;

const toKebabCase = (str: string) => {
  const matched = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
  );
  if (matched) {
    return matched.map(x => x.toLowerCase()).join("-");
  }
  return str;
};

const getHeaders = (source: string, headerPrefix: string): Header[] => {
  const headers: Header[] = [];
  if (!source) return headers;

  const matchedHeaders = source.match(headingRegex);
  if (!matchedHeaders || !matchedHeaders.length) return [];

  const lastIndexes = new Array(6).fill(null);
  for (const header of matchedHeaders) {
    const level: number = (header.match(/#/g) || []).length;
    const title = header.replace(/#/g, "").trim();
    let id = headerPrefix ? `${headerPrefix}-${title}` : title;

    const h: Header = {
      title,
      level,
      id: toKebabCase(id),
    };
    lastIndexes[level - 1] = h;

    if (level === 1) {
      headers.push(h);
      continue;
    }

    const occurrence = level - 2;
    if (lastIndexes[occurrence].children) {
      lastIndexes[occurrence].children.push(h);
    } else {
      lastIndexes[occurrence].children = [h];
    }
  }

  return headers;
};

export const extractHeaders = ({ source, options }: ExtractorPluginArgs): ExtractorPluginReturnType => {
  let hp = "";
  if (options) {
    const { headerPrefix = "" } = options;
    if (typeof headerPrefix === "function") {
      hp = headerPrefix(source);
    } else {
      hp = headerPrefix;
    }
  }
  const headers: Header[] = getHeaders(source.rawContent, hp);

  return {
    headers,
  };
};
