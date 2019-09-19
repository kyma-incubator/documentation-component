import React from "react";

import { TableContainer } from "./components/Table/TableContainer";
import { ErrorBoundary } from "./components/ErrorComponents/ErrorBoundary";
import { ErrorComponent } from "./components/ErrorComponents/ErrorComponent";

import { Node, ErrorNode, isErrorNode } from "./types";
import { parse } from "./tools/Parser";

export interface ODataProps {
  schema: string;
}

const ODataReactRaw: React.FunctionComponent<ODataProps> = ({ schema }) => {
  if (!schema || typeof schema !== "string") {
    return <ErrorComponent />;
  }

  const data = parse.parseFromString(schema);
  if (!data) {
    return <ErrorComponent />;
  }

  const errors: ErrorNode[] = [];
  const dataForComponent: Node[] = [];

  data.children.forEach((elem: Node | ErrorNode) => {
    if (isErrorNode(elem)) {
      errors.push(elem);
    } else {
      dataForComponent.push(elem);
    }
  });

  return (
    <>
      {errors[0] && <ErrorComponent error={errors[0]} />}
      <TableContainer arg={dataForComponent} />
    </>
  );
};

const ODataReact: React.FunctionComponent<ODataProps> = ({ schema }) => (
  <ErrorBoundary>
    <ODataReactRaw schema={schema} />
  </ErrorBoundary>
);

export default ODataReact;
