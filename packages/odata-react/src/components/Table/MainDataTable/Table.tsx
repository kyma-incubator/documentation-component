import React, { useState, useEffect } from "react";
import { PanelActions, PanelHead, Panel, PanelHeader } from "fundamental-react";

import { CollapsibleRow } from "./CollapsibleRow";
import { CollapseArrow } from "../../CollapseArrow";

import { Node } from "../../../types";
import { bemClasses, makeUnique } from "../../../helpers";
import { useExpandedContext } from "../../../store";

export interface TableProps {
  columnData: string[];
  title: string;
  filteredData: Node[];
  id: string;
}

export const Table: React.FunctionComponent<TableProps> = ({
  columnData,
  title,
  filteredData,
}) => {
  const [show, setShow] = useState<boolean>(true);
  const handleState = () => setShow(state => !state);
  const { expanded, setNumberOfExpanded } = useExpandedContext();

  useEffect(() => {
    setShow(expanded);
  }, [expanded]);

  useEffect(() => {
    setNumberOfExpanded(state => (show ? state + 1 : state - 1));
  }, [show, setNumberOfExpanded]);

  const annotationsData: string[] = filteredData
    .map(
      (elem: Node) =>
        (elem.children &&
          elem.children.length > 0 &&
          elem.children[0].name !== "Collection" &&
          elem.children[0].name) ||
        "",
    )
    .filter((elem: string) => !!elem);

  const columnHeaders: string[] = [...columnData, ...annotationsData].filter(
    makeUnique,
  );

  return (
    <section className={bemClasses.element(`table-wrapper`)}>
      <Panel className={bemClasses.element(`table-panel`)}>
        <PanelHeader
          className={bemClasses.element(`table-header-wrapper`)}
          onClick={() => {
            handleState();
          }}
        >
          <PanelHead
            title={title}
            className={bemClasses.element(`table-header-wrapper-head`)}
          />
          <PanelActions className={bemClasses.element(`table-actions`)}>
            <CollapseArrow
              open={show}
              clickHandler={() => {
                handleState();
              }}
            />
          </PanelActions>
        </PanelHeader>
        {show && (
          <table className={bemClasses.element(`table`)}>
            <thead className={bemClasses.element(`table-head`)}>
              <tr className={bemClasses.element(`table-row`)}>
                {columnHeaders.map((elem: string, index: number) => (
                  <th
                    className={bemClasses.element(`table-head-cell`)}
                    key={index}
                  >
                    {elem}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={bemClasses.element(`table-body`)}>
              {filteredData.map((elem: any, idx: number) =>
                elem.children.length > 0 ? (
                  <CollapsibleRow
                    data={elem}
                    columnHeaders={columnHeaders}
                    key={idx}
                  />
                ) : (
                  <tr className={bemClasses.element(`table-row`)} key={idx}>
                    {columnHeaders.map((row: string, index: number) => (
                      <td
                        className={bemClasses.element(`table-cell`)}
                        key={index}
                      >
                        {elem.attributes[row] || elem[row.toLowerCase()] || ""}
                      </td>
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        )}
      </Panel>
    </section>
  );
};
