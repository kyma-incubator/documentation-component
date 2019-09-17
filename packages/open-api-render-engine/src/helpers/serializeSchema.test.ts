import { serializeSchema } from "./serializeSchema";

const json: any = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Swagger Petstore",
    description:
      "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
    termsOfService: "http://swagger.io/terms/",
    contact: {
      name: "Swagger API Team",
      email: "apiteam@swagger.io",
      url: "http://swagger.io",
    },
  },
};

const stringifiedJSON: string = `{
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "name": "Swagger API Team",
      "email": "apiteam@swagger.io",
      "url": "http://swagger.io"
    }
  }
}`;

const yaml: string = `
swagger: "2.0"
info:
  version: 1.0.0
  title: Swagger Petstore
  description: A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification
  termsOfService: http://swagger.io/terms/
  contact:
    name: Swagger API Team
    email: apiteam@swagger.io
    url: http://swagger.io
`;

describe("serializeSchema", () => {
  test("should return JSON if input is JSON", () => {
    const input = json;
    const output = serializeSchema(input);

    expect(output).toStrictEqual(json);
  });
  test("should return JSON if input is stringified JSON", () => {
    const input = stringifiedJSON;
    const output = serializeSchema(input);

    expect(output).toStrictEqual(json);
  });
  test("should return JSON if input is yaml", () => {
    const input = yaml;
    const output = serializeSchema(input);

    expect(output).toStrictEqual(json);
  });
});
