import React from "react";

import { Node } from "../../../types";
import { bemClasses, makeUnique } from "../../../helpers";

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
    <table className={bemClasses.element(`table`)}>
      <thead className={bemClasses.element(`table-head`)}>
        <tr className={bemClasses.element(`table-row`)}>
          {filteredHeaders.map((arg: string) => (
            <th className={bemClasses.element(`table-head-cell`)} key={arg}>
              {arg}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={bemClasses.element(`table-body`)}>
        {data.children.map((elem: Node, index: number) => (
          <tr className={bemClasses.element(`table-row`)} key={index}>
            {filteredHeaders.map((el: string) => (
              <td className={bemClasses.element(`table-cell`)} key={el}>
                {elem.attributes[el] ||
                  (elem.children[0] && elem.children[0].value)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
