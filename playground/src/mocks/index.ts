import { markdownMock } from "./markdown";

import odataMocks from "./odata";
import openapiMocks from "./openapi";
import * as asyncApiMocks from "./asyncapi";

export const sources = [
  {
    sources: [
      {
        source: {
          type: "markdown",
          rawContent: markdownMock,
        },
      },
      {
        source: {
          type: "asyncapi",
          rawContent: asyncApiMocks.streetlights,
        },
      },
      {
        source: {
          type: "openapi",
          rawContent: openapiMocks.YAMLV3,
        },
      },
      {
        source: {
          type: "odata",
          rawContent: odataMocks.ODataProductsV3,
        },
      },
    ],
  },
];
