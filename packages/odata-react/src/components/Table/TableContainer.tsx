import React from "react";

import { ServiceDocumentationTable } from "./ServiceDocumentationTable/ServiceDocumentationTable";
import { Table } from "./MainDataTable/Table";
import { CollapseButton } from "../CollapseButton";

import { Node } from "../../types";
import { makeUnique } from "../../helpers";
import { useExpandedContext } from "../../store";
import {
  CSS_PREFIX,
  TABLES_TO_IGNORE_COLUMNS,
  CHILDREN_TO_IGNORE_COLUMNS,
} from "../../constants";

export interface TableContainerProps {
  arg: Node[];
}

export const TableContainer: React.FunctionComponent<TableContainerProps> = ({
  arg,
}) => {
  const Documentation: Node[] = [];
  const Rest: Node[] = [];

  arg.forEach((elem: Node) => {
    if (elem.name === "Annotations") {
      Documentation.push(elem);
    } else if (
      !!elem &&
      Array.isArray(elem.children) &&
      !TABLES_TO_IGNORE_COLUMNS.includes(elem.name)
    ) {
      Rest.push(elem);
    }
  });

  let numberOfElements = Rest.length;
  numberOfElements += Documentation && Documentation.length > 0 ? 1 : 0;

  return (
    <main className={CSS_PREFIX}>
      <useExpandedContext.Provider numberOfElements={numberOfElements}>
        <CollapseButton />
        {Documentation && Documentation.length > 0 && (
          <ServiceDocumentationTable data={Documentation} />
        )}
        {Rest.map((data: Node) => {
          const filteredData: any[] = data.children.filter(
            (el: Node) => !CHILDREN_TO_IGNORE_COLUMNS.includes(el.name),
          );

          const columnData: string[] = filteredData
            .flatMap((elem: { attributes: string }) =>
              Object.keys(elem.attributes),
            )
            .filter((elem: string, index: number, self: string[]) =>
              elem === "Term" ? false : makeUnique(elem, index, self),
            );

          const title = `${data.name || "Entity"} ${data.attributes.Name ||
            data.attributes.Term ||
            data.attributes.Target}`;

          const id = title
            .toLocaleLowerCase()
            .split(" ")
            .join("_");

          return (
            <Table
              key={title}
              id={id}
              columnData={columnData}
              title={title}
              filteredData={filteredData}
            />
          );
        })}
      </useExpandedContext.Provider>
    </main>
  );
};
