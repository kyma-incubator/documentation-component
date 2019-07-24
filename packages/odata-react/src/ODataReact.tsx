import React from "react";
import { parse } from "./tools/Parser";
import { Node, ErrorNode, isErrorNode } from "./types";

import TableContainer from "./components/Table/TableContainer";
import { ErrorComponent } from "./components/ErrorComponent/ErrorComponent";

export interface ODataProps {
  schema: string;
}

export const ODataReact: React.FunctionComponent<ODataProps> = ({ schema }) => {
  if (!schema) {
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

export default ODataReact;
