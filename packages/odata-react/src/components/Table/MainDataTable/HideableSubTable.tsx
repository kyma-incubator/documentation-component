import React from "react";

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

export interface HideableSubTableProps {
  data: Node;
}

export const HideableSubTable: React.FunctionComponent<
  HideableSubTableProps
> = ({ data }) => {
  const filteredHeaders = data.children
    .flatMap((elem: any) => [
      ...Object.keys(elem.attributes),
      ...elem.children.map((child: Node) => child.name),
    ])
    .filter(makeUnique);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {filteredHeaders.map((arg: string) => (
            <TableHeadCell key={arg}>{arg}</TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.children.map((elem: Node, index: number) => (
          <TableRow key={index}>
            {filteredHeaders.map((el: string) => (
              <TableCell key={el}>
                {elem.attributes[el] ||
                  (elem.children[0] && elem.children[0].value)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
