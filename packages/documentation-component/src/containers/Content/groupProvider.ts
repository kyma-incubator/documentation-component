import React, { useContext as uc } from "react";
import createUseContext from "constate";
import { Source } from "../..";

export interface GroupProviderProps {
  sources: Source[];
}

const GroupProvider = (context: GroupProviderProps) => ({
  ...context,
});

const { Provider, Context } = createUseContext(GroupProvider);
function useGroupContext() {
  return uc(Context);
}

export { Provider, Context, useGroupContext };
