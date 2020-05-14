import React, { useState } from "react";

import { SimpleTable } from "./SimpleTable";
import { CollapseArrow } from "../../CollapseArrow";

import { Node } from "../../../types";
import { makeUnique } from "../../../helpers";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "../../shared";

export interface CollapsibleAnnotationProps {
  data: Node;
}

export const CollapsibleAnnotation: React.FunctionComponent<CollapsibleAnnotationProps> = ({
  data,
}) => {
  const [show, useShow] = useState<boolean>(false);
  const headers = data.children
    .map((child: Node) => child.name)
    .filter(makeUnique);

  const useToggleShow = () => useShow(!show);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>{headers[0] || "Data"}</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <CollapseArrow
              open={show}
              clickHandler={useToggleShow}
              blueArrow={true}
            />
          </TableCell>
        </TableRow>
        {show && (
          <TableRow>
            <TableCell>
              <SimpleTable
                title="Text"
                data={data.children.map((elem: Node) => elem.value)}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
