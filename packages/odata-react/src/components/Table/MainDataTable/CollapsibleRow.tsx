import React, { useState } from "react";

import { HideableSubTable } from "./HideableSubTable";
import { CollapseArrow } from "../../CollapseArrow";

import { Node } from "../../../types";
import { bemClasses } from "../../../helpers";

interface CollapsibleRowProps {
  columnHeaders: string[];
  data: Node & { [key: string]: string };
}

export const CollapsibleRow: React.FunctionComponent<CollapsibleRowProps> = ({
  columnHeaders,
  data,
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <tr className={bemClasses.element(`table-row`)}>
        {columnHeaders.map((row: string, index: number) => (
          <td className={bemClasses.element(`table-cell`)} key={index}>
            {row === "Annotation" ? (
              <CollapseArrow
                open={show}
                clickHandler={() => setShow(!show)}
                blueArrow={true}
              />
            ) : (
              data.attributes[row] || data[row.toLowerCase()] || ""
            )}
          </td>
        ))}
      </tr>
      {show && (
        <tr className={bemClasses.element(`table-row`)}>
          <td
            className={bemClasses.element(`table-cell`)}
            colSpan={columnHeaders.length}
          >
            <HideableSubTable data={data} />
          </td>
        </tr>
      )}
    </>
  );
};
