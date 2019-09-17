import React, { useState, useEffect } from "react";

import { CollapsibleRow } from "./CollapsibleRow";
import { CollapseArrow } from "../../CollapseArrow";

import { Node } from "../../../types";
import { makeUnique } from "../../../helpers";
import {
  TableWrapper,
  Table as TableComponent,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
  Panel,
  PanelActions,
  PanelHead,
  PanelHeader,
} from "../../shared";
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
    <TableWrapper>
      <Panel>
        <PanelHeader
          onClick={() => {
            handleState();
          }}
        >
          <PanelHead title={title} />
          <PanelActions>
            <CollapseArrow
              open={show}
              clickHandler={() => {
                handleState();
              }}
            />
          </PanelActions>
        </PanelHeader>
        {show && (
          <TableComponent>
            <TableHead>
              <TableRow>
                {columnHeaders.map((elem: string, index: number) => (
                  <TableHeadCell key={index}>{elem}</TableHeadCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((elem: any, idx: number) =>
                elem.children.length > 0 ? (
                  <CollapsibleRow
                    data={elem}
                    columnHeaders={columnHeaders}
                    key={idx}
                  />
                ) : (
                  <TableRow key={idx}>
                    {columnHeaders.map((row: string, index: number) => (
                      <TableCell key={index}>
                        {elem.attributes[row] || elem[row.toLowerCase()] || ""}
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )}
            </TableBody>
          </TableComponent>
        )}
      </Panel>
    </TableWrapper>
  );
};
