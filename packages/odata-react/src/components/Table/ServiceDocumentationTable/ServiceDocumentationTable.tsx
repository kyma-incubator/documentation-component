import React, { Fragment, useState } from "react";
import CollapsibleTable from "./CollapsibleTable";
import { Node } from "../../../types";

import { PanelActions, PanelHead } from "fundamental-react";
import {
  StyledTable,
  TableHead,
  TableHeadCell,
  TablePanel,
  TableRow,
  TableCell,
  TableWrapper,
  TableBody,
  CollapseArrow,
  TableHeaderWrapper,
} from "../../styled/styled";

import { useCollapseContext } from "../../../store";

const STORE_DOC_TABLE_NAME = "service_documentation_table";

interface Props {
  data: Node[];
}

const inverseArrayValue = (arr: boolean[], index: number) => {
  const data: boolean[] = [...arr];
  data[index] = !data[index];
  return data;
};

const ServiceDocumentationTable: React.FunctionComponent<Props> = ({
  data,
}) => {
  const { state, updatePartOfCollapseState } = useCollapseContext();
  const show = state[STORE_DOC_TABLE_NAME];
  const setShow = () =>
    updatePartOfCollapseState({ [STORE_DOC_TABLE_NAME]: !show });

  if (state[STORE_DOC_TABLE_NAME] === undefined) {
    updatePartOfCollapseState({ [STORE_DOC_TABLE_NAME]: true });
  }

  const [showPart, setShowPart] = useState<boolean[]>(
    Array(data.length).fill(false),
  );

  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <TableWrapper>
      <TablePanel>
        <TableHeaderWrapper
          onClick={() => {
            if (show) {
              setShowPart(Array(data.length).fill(false));
            }
            setShow();
          }}
        >
          <PanelHead title={"Service Documentation / Annotations"} />
          <PanelActions>
            <CollapseArrow
              open={show}
              clickHandler={() => {
                if (show) {
                  setShowPart(Array(data.length).fill(false));
                }
                setShow();
              }}
            />
          </PanelActions>
        </TableHeaderWrapper>
        {show && (
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeadCell>{"Target"}</TableHeadCell>
                <TableHeadCell>{"Annotation"}</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((value: Node, index: number) => {
                const showEl = showPart[index];
                return (
                  <Fragment key={index}>
                    <TableRow>
                      <TableCell>{value.attributes.Target}</TableCell>
                      <TableCell>
                        <CollapseArrow
                          blueArrow={true}
                          open={showEl}
                          clickHandler={() =>
                            setShowPart(inverseArrayValue(showPart, index))
                          }
                        />
                      </TableCell>
                    </TableRow>
                    {showEl && (
                      <tr>
                        <TableCell colSpan={2}>
                          <CollapsibleTable data={value} />
                        </TableCell>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </StyledTable>
        )}
      </TablePanel>
    </TableWrapper>
  );
};

export default ServiceDocumentationTable;
