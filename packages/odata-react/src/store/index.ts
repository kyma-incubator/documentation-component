import { useState } from "react";
import createUseContext from "constate";

interface Props {
  numberOfElements: number;
}

const useExpandedState = ({ numberOfElements }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [numberOfExpanded, setNumberOfExpanded] = useState<number>(
    numberOfElements,
  );

  return {
    numberOfElements,
    expanded,
    setExpanded,
    numberOfExpanded,
    setNumberOfExpanded,
  };
};

export const useExpandedContext = createUseContext(useExpandedState);
