import React, { Fragment, useState, useEffect } from "react";
import { PanelActions, PanelHead, Panel, PanelHeader } from "fundamental-react";

import { CollapsibleTable } from "./CollapsibleTable";
import { CollapseArrow } from "../../CollapseArrow";

import { Node } from "../../../types";
import { bemClasses } from "../../../helpers";
import { useExpandedContext } from "../../../store";

const inverseArrayValue = (arr: boolean[], index: number) => {
  const data: boolean[] = [...arr];
  data[index] = !data[index];
  return data;
};

export interface ServiceDocumentationTableProps {
  data: Node[];
}

export const ServiceDocumentationTable: React.FunctionComponent<
  ServiceDocumentationTableProps
> = ({ data }) => {
  const [show, setShow] = useState<boolean>(true);
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
    <section className={bemClasses.element(`table-wrapper`)}>
      <Panel className={bemClasses.element(`table-panel`)}>
        <PanelHeader
          className={bemClasses.element(`table-header-wrapper`)}
          onClick={() => {
            if (show) {
              setShowPart(Array(data.length).fill(false));
            }
            handleState();
          }}
        >
          <PanelHead
            title={"Service Documentation / Annotations"}
            className={bemClasses.element(`table-header-wrapper-head`)}
          />
          <PanelActions className={bemClasses.element(`table-actions`)}>
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
        </PanelHeader>
        {show && (
          <table className={bemClasses.element(`table`)}>
            <thead className={bemClasses.element(`table-head`)}>
              <tr className={bemClasses.element(`table-row`)}>
                <th className={bemClasses.element(`table-head-cell`)}>
                  {"Target"}
                </th>
                <th className={bemClasses.element(`table-head-cell`)}>
                  {"Annotation"}
                </th>
              </tr>
            </thead>
            <tbody className={bemClasses.element(`table-body`)}>
              {data.map((value: Node, index: number) => {
                const showEl = showPart[index];
                return (
                  <Fragment key={index}>
                    <tr className={bemClasses.element(`table-row`)}>
                      <td className={bemClasses.element(`table-cell`)}>
                        {value.attributes.Target}
                      </td>
                      <td className={bemClasses.element(`table-cell`)}>
                        <CollapseArrow
                          blueArrow={true}
                          open={showEl}
                          clickHandler={() =>
                            setShowPart(inverseArrayValue(showPart, index))
                          }
                        />
                      </td>
                    </tr>
                    {showEl && (
                      <tr>
                        <td
                          className={bemClasses.element(`table-cell`)}
                          colSpan={2}
                        >
                          <CollapsibleTable data={value} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </Panel>
    </section>
  );
};
