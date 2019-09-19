import React, { useState } from "react";

import { HideableSubTable } from "./HideableSubTable";
import { CollapseArrow } from "../../CollapseArrow";

import { Node } from "../../../types";
import { TableRow, TableCell } from "../../shared";

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
      <TableRow>
        {columnHeaders.map((row: string, index: number) => (
          <TableCell key={index}>
            {row === "Annotation" ? (
              <CollapseArrow
                open={show}
                clickHandler={() => setShow(!show)}
                blueArrow={true}
              />
            ) : (
              data.attributes[row] || data[row.toLowerCase()] || ""
            )}
          </TableCell>
        ))}
      </TableRow>
      {show && (
        <TableRow>
          <TableCell colSpan={columnHeaders.length}>
            <HideableSubTable data={data} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
