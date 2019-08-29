import React from "react";
import { CollapseButton as StyledButton } from "./../styled/styled";
import { useExpandedContext } from "../../store";

export const CollapseButton = () => {
  const { expanded, setExpanded } = useExpandedContext();
  const text = expanded ? "Collapse All" : "Expand All";

  return (
    <StyledButton onClick={() => setExpanded(state => !state)}>
      {text}
    </StyledButton>
  );
};
