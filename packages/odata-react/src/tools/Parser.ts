import { xml2js } from "xml-js";
import { transformer } from "./Transformer";

export const deepSearch = (
  object: any,
  key: string,
  predicate: (key: string, data: string) => boolean,
): any => {
  if (object.hasOwnProperty(key) && predicate(key, object[key])) {
    return object;
  }
  for (const k in object) {
    if (typeof object[k] === "object") {
      const o = deepSearch(object[k], key, predicate);
      if (o !== null) return o;
    }
  }
  return null;
};

class Parser {
  parseFromString(xmlString: string): any {
    const outXmlString = transformer.transformToV4(xmlString);

    const rawObject = xml2js(outXmlString, {
      elementsKey: "children",
      alwaysChildren: true,
    });
    return deepSearch(rawObject, "name", (k, v) => v === "Schema");
  }
}

export const parse = new Parser();
