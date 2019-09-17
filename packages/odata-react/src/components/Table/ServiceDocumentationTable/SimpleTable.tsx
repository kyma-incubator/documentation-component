import React from "react";

import { bemClasses } from "../../../helpers";

export interface SimpleTableProps {
  title: string;
  data: string[];
}

export const SimpleTable: React.FunctionComponent<SimpleTableProps> = ({
  title,
  data,
}) => (
  <table className={bemClasses.element(`table`)}>
    <thead className={bemClasses.element(`table-head`)}>
      <tr className={bemClasses.element(`table-row`)}>
        <th className={bemClasses.element(`table-head-cell`)}>{title}</th>
      </tr>
    </thead>
    <tbody className={bemClasses.element(`table-body`)}>
      {data.map((elem: string) => (
        <tr className={bemClasses.element(`table-row`)} key={elem}>
          <td className={bemClasses.element(`table-cell`)}>{elem}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
