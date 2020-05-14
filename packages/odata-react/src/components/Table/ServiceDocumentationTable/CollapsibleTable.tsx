import React, { Fragment, useState } from "react";

import { CollapsibleAnnotation } from "./CollapsibleAnnotation";
import { CollapseArrow } from "../../CollapseArrow";

import { makeUnique } from "../../../helpers";
import { Node } from "../../../types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "../../shared";

export interface CollapsibleTableProps {
  data: Node;
}

export const CollapsibleTable: React.FunctionComponent<CollapsibleTableProps> = ({
  data,
}) => {
  const [show, setShow] = useState<boolean[]>(
    Array(data.children.length).fill(false),
  );

  const toggleProperRow = (index: number): void => {
    const arr = [...show];
    arr[index] = !arr[index];
    setShow(arr);
  };

  const attributesColumn: string[] = data.children
    .flatMap((elem: { attributes: any }) => Object.keys(elem.attributes))
    .filter(makeUnique);

  const specialData: string[] = data.children
    .map(
      (elem: Node) =>
        (elem.children && elem.children[0] && elem.children[0].name) || "",
    )
    .filter((elem: string) => !!elem)
    .filter(makeUnique);

  const columnHeaders: string[] = [...attributesColumn, ...specialData];

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columnHeaders.map((elem: string, index: number) => (
            <TableHeadCell key={index}>{elem}</TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.children.map((child: Node, index: number) => {
          const specialHeader: Node = child.children[0];
          if (specialHeader && specialHeader.name === "Collection") {
            return (
              <Fragment key={index}>
                <TableRow>
                  {columnHeaders.map((el: string, idx: number) => (
                    <TableCell key={idx}>
                      {child.attributes[el] ||
                        (specialHeader && specialHeader.name === el && (
                          <CollapseArrow
                            blueArrow={true}
                            open={show[index]}
                            clickHandler={() => toggleProperRow(index)}
                          />
                        ))}
                    </TableCell>
                  ))}
                </TableRow>
                {show[index] && (
                  <TableRow>
                    <TableCell colSpan={columnHeaders.length}>
                      <CollapsibleAnnotation data={specialHeader} />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          }

          return (
            <TableRow key={index}>
              {columnHeaders.map((el: string, idx: number) => (
                <TableCell key={idx}>
                  {child.attributes[el] ||
                    (specialHeader &&
                      specialHeader.name === el &&
                      specialHeader.value)}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
