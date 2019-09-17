import { openapiMock } from "./openapi";
import { markdownMock } from "./markdown";

import odataMocks from "./odata";
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
          rawContent: openapiMock,
        },
      },
      {
        source: {
          type: "odata",
          rawContent: odataMocks.ODataC4C,
        },
      },
    ],
  },
];
