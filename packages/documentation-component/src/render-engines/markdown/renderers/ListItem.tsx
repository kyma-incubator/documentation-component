import React from "react";

export interface ListItemProps {
  checked: boolean | null;
  index: number;
}

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  index,
  children,
}) => <li key={index}>{children}</li>;
