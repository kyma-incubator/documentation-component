import React, { useContext } from "react";
import { Context } from "../Container";
import { Source } from "../../interfaces";

export const Navigation: React.FunctionComponent = () => {
  const { sources } = useContext(Context);

  if (!sources) {
    return null;
  }
  const headers = extractHeaders(sources);

  return (
    <div
      className={createElementClass(`${contextNavigationClassName}-wrapper`)}
    >
      {renderHeaders(headers)}
    </div>
  );
};
