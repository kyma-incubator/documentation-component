import React from "react";
import {
  Panel as PanelComponent,
  PanelHeader as PanelHeaderComponent,
  PanelHead as PanelHeadComponent,
  PanelActions as PanelActionsComponent,
} from "fundamental-react";

import { bemClasses } from "../helpers";

export const TableWrapper: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <section className={bemClasses.element(`table-wrapper`)} {...otherProps}>
    {children}
  </section>
);

export const Panel: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <PanelComponent className={bemClasses.element(`table-panel`)} {...otherProps}>
    {children}
  </PanelComponent>
);

export const PanelHeader: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <PanelHeaderComponent
    className={bemClasses.element(`table-header-wrapper`)}
    {...otherProps}
  >
    {children}
  </PanelHeaderComponent>
);

export const PanelHead: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <PanelHeadComponent
    className={bemClasses.element(`table-header-wrapper-head`)}
    {...otherProps}
  >
    {children}
  </PanelHeadComponent>
);

export const PanelActions: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <PanelActionsComponent
    className={bemClasses.element(`table-actions`)}
    {...otherProps}
  >
    {children}
  </PanelActionsComponent>
);

export const Table: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <table className={bemClasses.element(`table`)} {...otherProps}>
    {children}
  </table>
);

export const TableHead: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <thead className={bemClasses.element(`table-head`)} {...otherProps}>
    {children}
  </thead>
);

export const TableBody: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <tbody className={bemClasses.element(`table-body`)} {...otherProps}>
    {children}
  </tbody>
);

export const TableRow: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <tr className={bemClasses.element(`table-row`)} {...otherProps}>
    {children}
  </tr>
);

export const TableHeadCell: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <th className={bemClasses.element(`table-head-cell`)} {...otherProps}>
    {children}
  </th>
);

export const TableCell: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => (
  <td className={bemClasses.element(`table-cell`)} {...otherProps}>
    {children}
  </td>
);
