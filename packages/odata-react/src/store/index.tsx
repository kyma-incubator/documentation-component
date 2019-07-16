import { useState } from "react";
import createUseContext from "constate";

interface StoreShape {
  [key: string]: boolean;
}

const useCollapseStateRaw = () => {
  const [state, setState] = useState<StoreShape>({});
  const updatePart = (arg: StoreShape) => setState({ ...state, ...arg });
  const updateWholeState = (arg: boolean) => {
    const changedState = Object.fromEntries(
      Object.entries(state).map(elem => [elem[0], arg]),
    );
    setState({ ...changedState });
  };

  return { state, updatePart, updateWholeState };
};

export const useCollapseContext = createUseContext(useCollapseStateRaw);
