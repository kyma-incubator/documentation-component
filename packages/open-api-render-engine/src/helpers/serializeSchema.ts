import { safeLoad } from "js-yaml";

function serializeJSON(schema: any): any {
  try {
    return JSON.parse(JSON.stringify(schema));
  } catch (e) {
    return schema;
  }
}

export function serializeSchema(schema: any): any {
  if (typeof schema === "object") {
    return serializeJSON(schema);
  }

  try {
    return safeLoad(schema);
  } catch (e) {
    return serializeJSON(schema);
  }
}
