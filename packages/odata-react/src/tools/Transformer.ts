import xslt from "xslt";

import V2V3toV4 from "./V2V3toV4";

class Transformer {
  transformToV4(xmlString: string) {
    return xslt(xmlString, V2V3toV4, {
      fullDocument: true,
    });
  }
}

export const transformer = new Transformer();
