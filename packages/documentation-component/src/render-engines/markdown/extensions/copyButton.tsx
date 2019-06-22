import React from "react";
import CopyToClipboard, { Options } from "react-copy-to-clipboard";
import { createElementClass } from "../../../helpers";

export interface CopyButtonProps {
  code: string;
  placeholder?: React.ReactNode;
  wrapContent?(content: React.ReactNode): React.ReactNode;
  onCopy?(a: string, b: boolean): void;
  copyOptions?: Options;
}

export const CopyButton: React.FunctionComponent<CopyButtonProps> = ({
  code,
  wrapContent,
  placeholder = "Copy text",
  onCopy,
  copyOptions,
}) => {
  let content: React.ReactNode = (
    <CopyToClipboard text={code} onCopy={onCopy} options={copyOptions}>
      {placeholder}
    </CopyToClipboard>
  );

  if (wrapContent) {
    content = wrapContent(content);
  }

  return <div className={createElementClass("copy-button")}>{content}</div>;
};
