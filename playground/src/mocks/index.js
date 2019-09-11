import { asyncapiSpecMock } from "./asyncapi";
import { odatamock } from "./odata";
import { openapiMock } from "./openapi";

import { markdownMock } from "./markdown";

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
          rawContent: asyncapiSpecMock,
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
          rawContent: odatamock,
        },
      },
    ],
  },
];
