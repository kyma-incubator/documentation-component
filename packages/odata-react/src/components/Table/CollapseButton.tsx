import React, { useEffect } from "react";
import { CollapseButton as StyledButton } from "./../styled/styled";
import { useExpandedContext } from "../../store";

export const CollapseButton = () => {
  const {
    expanded,
    setExpanded,
    numberOfElements,
    numberOfExpanded,
  } = useExpandedContext();
  const text = expanded ? "Collapse All" : "Expand All";

  useEffect(() => {
    if (numberOfExpanded === 0 && !expanded) {
      setExpanded(false);
    }
    if (numberOfExpanded === numberOfElements && !expanded) {
      setExpanded(true);
    }
    // eslint-disable-next-line
  }, [numberOfExpanded]);

  return (
    <StyledButton onClick={() => setExpanded(state => !state)}>
      {text}
    </StyledButton>
  );
};
