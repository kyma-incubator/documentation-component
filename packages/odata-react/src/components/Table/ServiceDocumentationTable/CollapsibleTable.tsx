import React, { Fragment, useState } from "react";

import { CollapsibleAnnotation } from "./CollapsibleAnnotation";
import { CollapseArrow } from "../../CollapseArrow";

import { bemClasses, makeUnique } from "../../../helpers";
import { Node } from "../../../types";

export interface CollapsibleTableProps {
  data: Node;
}

export const CollapsibleTable: React.FunctionComponent<
  CollapsibleTableProps
> = ({ data }) => {
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
    <table className={bemClasses.element(`table`)}>
      <thead className={bemClasses.element(`table-head`)}>
        <tr className={bemClasses.element(`table-row`)}>
          {columnHeaders.map((elem: string, index: number) => (
            <th className={bemClasses.element(`table-head-cell`)} key={index}>
              {elem}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={bemClasses.element(`table-body`)}>
        {data.children.map((child: Node, index: number) => {
          const specialHeader: Node = child.children[0];
          if (specialHeader && specialHeader.name === "Collection") {
            return (
              <Fragment key={index}>
                <tr className={bemClasses.element(`table-row`)}>
                  {columnHeaders.map((el: string, idx: number) => (
                    <td className={bemClasses.element(`table-cell`)} key={idx}>
                      {child.attributes[el] ||
                        (specialHeader && specialHeader.name === el && (
                          <CollapseArrow
                            blueArrow={true}
                            open={show[index]}
                            clickHandler={() => toggleProperRow(index)}
                          />
                        ))}
                    </td>
                  ))}
                </tr>
                {show[index] && (
                  <tr className={bemClasses.element(`table-row`)}>
                    <td
                      className={bemClasses.element(`table-cell`)}
                      colSpan={columnHeaders.length}
                    >
                      <CollapsibleAnnotation data={specialHeader} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          }

          return (
            <tr className={bemClasses.element(`table-row`)} key={index}>
              {columnHeaders.map((el: string, idx: number) => (
                <td className={bemClasses.element(`table-cell`)} key={idx}>
                  {child.attributes[el] ||
                    (specialHeader &&
                      specialHeader.name === el &&
                      specialHeader.value)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
