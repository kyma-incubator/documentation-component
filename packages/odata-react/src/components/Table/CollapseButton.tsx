import React from "react";
import { CollapseButton as StyledButton } from "./../styled/styled";
import { useCollapseContext } from "../../store";

export const CollapseButton = () => {
  const { state, updateWholeCollapseState } = useCollapseContext();

  const allSectionsExpanded = !Object.values(state).some(arg => !arg);

  const text = allSectionsExpanded ? "Collapse All" : "Expand All";

  return (
    <StyledButton
      onClick={() => updateWholeCollapseState(!allSectionsExpanded)}
    >
      {text}
    </StyledButton>
  );
};
