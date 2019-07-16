import React from "react";
import { Node } from "../../../types";
import { makeUnique } from "../utils";
import CollapsibleRow from "./CollapsibleRow";
import { PanelActions, PanelHead } from "fundamental-react";

import {
  StyledTable,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  TableWrapper,
  CollapseArrow,
  TableHeaderWrapper,
  TablePanel,
  TableBody,
} from "../../styled/styled";

import { useCollapseContext } from "../../../store";

interface Props {
  columnData: string[];
  title: string;
  filteredData: Node[];
  id: string;
}

const Table: React.FunctionComponent<Props> = ({
  columnData,
  title,
  filteredData,
  id,
}) => {
  const {
    state: collapseState,
    updatePartOfCollapseState: updateState,
  } = useCollapseContext();
  const show = collapseState[id];
  const setShow = () => updateState({ [id]: !show });
  if (collapseState[id] === undefined) {
    // setting initial state
    updateState({ [id]: true });
  }

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
      <TablePanel>
        <TableHeaderWrapper
          onClick={() => {
            setShow();
          }}
        >
          <PanelHead title={title} />
          <PanelActions>
            <CollapseArrow
              open={show}
              clickHandler={() => {
                setShow();
              }}
            />
          </PanelActions>
        </TableHeaderWrapper>
        {show && (
          <StyledTable>
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
          </StyledTable>
        )}
      </TablePanel>
    </TableWrapper>
  );
};

export default Table;
