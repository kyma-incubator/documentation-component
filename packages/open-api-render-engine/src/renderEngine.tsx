import React, { useEffect } from "react";
import { RenderEngineProps } from "@kyma-project/documentation-component";
import { OpenApiProps } from "./types";

function createSwagger(schema: any, plugins: any) {
  return import("swagger-ui-dist").then(swagger => {
    const presets = [swagger.SwaggerUIBundle.presets.apis, plugins];

    // temporary any type, because some fucking idiot added not correct types to @types/swagger-ui-dist package
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
  if (url) {
    schema = { ...schema, host: url };
  }
  return schema;
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
