import React, { Fragment, useState, useEffect } from "react";
import { Panel } from "fundamental-react";

import { CollapsibleTable } from "./CollapsibleTable";
import { CollapseArrow } from "../../CollapseArrow";

import { Node } from "../../../types";
import { useExpandedContext } from "../../../store";
import {
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "../../shared";

const inverseArrayValue = (arr: boolean[], index: number) => {
  const data: boolean[] = [...arr];
  data[index] = !data[index];
  return data;
};

export interface ServiceDocumentationTableProps {
  data: Node[];
}

export const ServiceDocumentationTable: React.FunctionComponent<ServiceDocumentationTableProps> = ({
  data,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const handleState = () => setShow(state => !state);
  const { expanded, setNumberOfExpanded } = useExpandedContext();

  const [showPart, setShowPart] = useState<boolean[]>(
    Array(data.length).fill(false),
  );

  useEffect(() => {
    setShow(expanded);
  }, [expanded]);

  useEffect(() => {
    setNumberOfExpanded(state => (show ? state + 1 : state - 1));
  }, [show, setNumberOfExpanded]);

  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <TableWrapper>
      <Panel>
        <Panel.Header
          onClick={() => {
            if (show) {
              setShowPart(Array(data.length).fill(false));
            }
            handleState();
          }}
        >
          <Panel.Head title={"Service Documentation / Annotations"} />
          <Panel.Actions>
            <CollapseArrow
              open={show}
              clickHandler={() => {
                if (show) {
                  setShowPart(Array(data.length).fill(false));
                }
                handleState();
              }}
            />
          </Panel.Actions>
        </Panel.Header>
        {show && (
          <Table>
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
                      <TableRow>
                        <TableCell colSpan={2}>
                          <CollapsibleTable data={value} />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Panel>
    </TableWrapper>
  );
};
