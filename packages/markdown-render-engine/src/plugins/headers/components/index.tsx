import React from "react";
import { HeadersNavigationProps, HeadersProvider } from "./provider";

export const HeadersNavigation: React.FunctionComponent<
  HeadersNavigationProps
> = ({ children, ...others }) => (
  <HeadersProvider {...others}>{children}</HeadersProvider>
);
