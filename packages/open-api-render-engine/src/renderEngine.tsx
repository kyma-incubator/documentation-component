import React, { useEffect } from "react";
import { RenderEngineProps } from "@kyma-project/documentation-component";

import { serializeSchema } from "./helpers";
import { OpenApiProps } from "./types";

import "swagger-ui-dist/swagger-ui.css";

function createSwagger(schema: any, plugins: any) {
  return import("swagger-ui-dist").then(swagger => {
    const presets = [swagger.SwaggerUIBundle.presets.apis, plugins];

    const ui = (swagger.SwaggerUIBundle as any)({
      dom_id: "#swagger",
      spec: schema,
      presets,
      requestInterceptor: (req: any) => {
        const bearer = localStorage.getItem("bearer");
        req.headers = {
          ...req.headers,
          Authorization: bearer,
        };
        return req;
      },
    });

    return ui;
  });
}

function prepareDataForCreate(schema: any, url: string): any {
  let serializedSchema: any = serializeSchema(schema);
  if (url) {
    serializedSchema = { ...serializedSchema, host: url };
  }
  return serializedSchema;
}

export const OpenApiRenderEngine: React.FunctionComponent<
  RenderEngineProps<OpenApiProps, any>
> = ({ source, options = {} }) => {
  useEffect(() => {
    const create = async () => {
      await createSwagger(
        prepareDataForCreate(
          source.content || source.rawContent,
          (source.data && source.data.url) || options.schemaUrl,
        ),
        options.plugins,
      );
    };

    create();
  }, [source, options]);

  return <div id="swagger" />;
};
