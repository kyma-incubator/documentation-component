import { useContext } from "react";
import createUseContext from "constate";
import { Source } from "../../interfaces";

export interface GroupProviderContext {
  sources: Source[];
}

const GroupProvider = (
  context: GroupProviderContext,
): GroupProviderContext => ({
  ...context,
});

const { Provider, Context } = createUseContext(GroupProvider);
function useGroupContext() {
  return useContext(Context);
}

export { Provider as GroupProvider, Context as GroupContext, useGroupContext };
