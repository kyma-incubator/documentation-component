import React from "react";
import ServiceDocumentationTable from "./ServiceDocumentationTable/ServiceDocumentationTable";
import { Node } from "../../types";
import { makeUnique } from "./utils";
import Table from "./MainDataTable/Table";
import { AppWrapper } from "../styled/styled";
import { useExpandedContext } from "../../store/index";
import { CollapseButton } from "../Table/CollapseButton";
interface Props {
  arg: Node[];
}

const CHILDREN_TO_IGNORE: string[] = [
  "Key",
  "NavigationProperty",
  "EntityContainer",
  "Annotation",
];

const TABLES_TO_IGNORE: string[] = [
  "EntityContainer",
  "EnumType",
  "Annotation",
];

const TableContainer: React.FunctionComponent<Props> = ({ arg }) => {
  const Documentation: Node[] = [];
  const Rest: Node[] = [];

  arg.forEach((elem: Node) => {
    if (elem.name === "Annotations") {
      Documentation.push(elem);
    } else if (
      !!elem &&
      Array.isArray(elem.children) &&
      !TABLES_TO_IGNORE.includes(elem.name)
    ) {
      Rest.push(elem);
    }
  });

  let numberOfElements = Rest.length;
  numberOfElements += Documentation && Documentation.length > 0 ? 1 : 0;

  const Provider = useExpandedContext.Provider;
  return (
    <AppWrapper>
      <Provider numberOfElements={numberOfElements}>
        <CollapseButton />
        {Documentation && Documentation.length > 0 && (
          <ServiceDocumentationTable data={Documentation} />
        )}
        {Rest.map((data: Node) => {
          const filteredData: any[] = data.children.filter(
            (el: Node) => !CHILDREN_TO_IGNORE.includes(el.name),
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
      </Provider>
    </AppWrapper>
  );
};

export default TableContainer;
