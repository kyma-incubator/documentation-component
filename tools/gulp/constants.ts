export const TS_CONFIG_FILE = "tsconfig.json";
export const ORGANIZATION_DIR = "@kyma-project";
export const PACKAGES_DIR = "packages";

export enum PACKAGES {
  DOCUMENTATION_COMPONENT = "DOCUMENTATION_COMPONENT",
  ODATA = "ODATA",
  ASYNC_API_RE = "ASYNC_API_RE",
  MARKDOWN_RE = "MARKDOWN_RE",
  ODATA_RE = "ODATA_RE",
  OPEN_API_RE = "OPEN_API_RE",
}

// order is important
export const Packages: {
  [p: string]: string;
} = {
  [PACKAGES.DOCUMENTATION_COMPONENT]: "documentation-component",
  [PACKAGES.ODATA]: "odata-react",
  [PACKAGES.ASYNC_API_RE]: "async-api-render-engine",
  [PACKAGES.MARKDOWN_RE]: "markdown-render-engine",
  [PACKAGES.ODATA_RE]: "odata-render-engine",
  [PACKAGES.OPEN_API_RE]: "open-api-render-engine",
};
export const packagesDirs = Object.values(Packages);

export const PackageNames: {
  [p: string]: string;
} = {
  [Packages.DOCUMENTATION_COMPONENT]: "documentation-component",
  [Packages.ODATA]: "odata-react",
  [Packages.ASYNC_API_RE]: "dc-async-api-render-engine",
  [Packages.MARKDOWN_RE]: "dc-markdown-render-engine",
  [Packages.ODATA_RE]: "dc-odata-render-engine",
  [Packages.OPEN_API_RE]: "dc-open-api-render-engine",
};
