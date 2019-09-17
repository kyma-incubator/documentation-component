import React, { useState } from "react";

import { SimpleTable } from "./SimpleTable";
import { CollapseArrow } from "../../CollapseArrow";

import { Node } from "../../../types";
import { bemClasses, makeUnique } from "../../../helpers";

export interface CollapsibleAnnotationProps {
  data: Node;
}

export const CollapsibleAnnotation: React.FunctionComponent<
  CollapsibleAnnotationProps
> = ({ data }) => {
  const [show, useShow] = useState<boolean>(false);
  const headers = data.children
    .map((child: Node) => child.name)
    .filter(makeUnique);

  const useToggleShow = () => useShow(!show);

  return (
    <table className={bemClasses.element(`table`)}>
      <thead className={bemClasses.element(`table-head`)}>
        <tr className={bemClasses.element(`table-row`)}>
          <th className={bemClasses.element(`table-head-cell`)}>
            {headers[0] || "Data"}
          </th>
        </tr>
      </thead>
      <tbody className={bemClasses.element(`table-body`)}>
        <tr className={bemClasses.element(`table-row`)}>
          <td className={bemClasses.element(`table-cell`)}>
            <CollapseArrow
              open={show}
              clickHandler={useToggleShow}
              blueArrow={true}
            />
          </td>
        </tr>
        {show && (
          <tr className={bemClasses.element(`table-row`)}>
            <td className={bemClasses.element(`table-cell`)}>
              <SimpleTable
                title="Text"
                data={data.children.map((elem: Node) => elem.value)}
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
