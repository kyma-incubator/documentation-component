import { safeLoad } from "js-yaml";

export function serializeSchema(schema: string | any): any {
  if (typeof schema === "object") {
    return schema;
  }

  try {
    return safeLoad(schema);
  } catch (e) {
    try {
      return JSON.parse(schema);
    } catch (e) {
      return {};
    }
  }
}
