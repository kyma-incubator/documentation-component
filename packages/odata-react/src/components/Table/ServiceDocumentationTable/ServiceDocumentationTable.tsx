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

// const STORE_DOC_TABLE_NAME = "service_documentation_table";

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
  const [show, setShow] = useState<boolean>(true);
  const handleState = () => setShow(state => !state);

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
            handleState();
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
                handleState();
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
