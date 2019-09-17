import React from "react";
import { Alert } from "fundamental-react";

import { ErrorNode } from "../../types";
import { ERROR_TEXT } from "../../constants";
import { bemClasses } from "../../helpers";

export interface ErrorComponentProps {
  error?: ErrorNode;
}

export const ErrorComponent: React.FunctionComponent<ErrorComponentProps> = ({
  error,
}) => {
  if (!error) {
    return (
      <div className={bemClasses.element(`error`)}>
        <Alert dismissible={true} type="error">
          {ERROR_TEXT}
        </Alert>
      </div>
    );
  }

  const data = error.children.map((elem: ErrorNode) => elem.children[0].text);
  const [header, code, p] = data;

  return (
    <div className={bemClasses.element(`error`)}>
      <Alert dismissible={true} type="error">
        <h3>{header}</h3>
        <code className={bemClasses.element(`code`)}>{code}</code>
        <p>{p}</p>
      </Alert>
    </div>
  );
};
