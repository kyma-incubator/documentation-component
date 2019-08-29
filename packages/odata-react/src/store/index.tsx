import { useState } from "react";
import createUseContext from "constate";

const useExpandedState = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  return { expanded, setExpanded };
};

export const useExpandedContext = createUseContext(useExpandedState);
