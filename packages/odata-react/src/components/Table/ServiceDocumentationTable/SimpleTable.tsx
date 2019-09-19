import React from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "../../shared";

export interface SimpleTableProps {
  title: string;
  data: string[];
}

export const SimpleTable: React.FunctionComponent<SimpleTableProps> = ({
  title,
  data,
}) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeadCell>{title}</TableHeadCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((elem: string) => (
        <TableRow key={elem}>
          <TableCell>{elem}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
