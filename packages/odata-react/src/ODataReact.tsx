import React from "react";
import { parse } from "./tools/Parser";
import { Node, ErrorNode, isErrorNode } from "./types";
import { ErrorBoundary } from "./components/ErrorComponents/ErrorBoundary";
import TableContainer from "./components/Table/TableContainer";
import { ErrorComponent } from "./components/ErrorComponents/ErrorComponent";

export interface ODataProps {
  schema: string;
}

const ODataReact: React.FunctionComponent<ODataProps> = ({ schema }) => {
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

const ODataErrBoundary: React.FunctionComponent<ODataProps> = ({ schema }) => (
  <ErrorBoundary>
    <ODataReact schema={schema} />
  </ErrorBoundary>
);

export default ODataErrBoundary;
