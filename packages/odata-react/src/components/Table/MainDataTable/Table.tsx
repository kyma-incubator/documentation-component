import React, { useState, useEffect } from "react";
import { Node } from "../../../types";
import { makeUnique } from "../utils";
import CollapsibleRow from "./CollapsibleRow";
import { PanelActions, PanelHead } from "fundamental-react";
import { useExpandedContext } from "../../../store/index";

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
      <TablePanel>
        <TableHeaderWrapper
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
