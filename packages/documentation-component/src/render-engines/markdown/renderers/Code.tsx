import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import CopyToClipboard, { Options } from "react-copy-to-clipboard";
import { createElementClass, createModifierClass } from "../../../helpers";

interface CopyButtonProps {
  code: string;
  placeholder?: React.ReactNode;
  copyOptions?: Options;
  onCopy?(a: string, b: boolean): void;
}

const CopyButton: React.FunctionComponent<CopyButtonProps> = ({
  code,
  placeholder = "Copy content",
  onCopy,
  copyOptions,
}) => {
  const content: React.ReactNode = (
    <CopyToClipboard text={code} onCopy={onCopy} options={copyOptions}>
      <span>{placeholder}</span>
    </CopyToClipboard>
  );

  return <div className={createElementClass("copy-button")}>{content}</div>;
};

export interface CodeProps {
  language: string;
  value: string;
  highlightTheme?: any;
  copyButton?: React.ReactNode;
}

export const Code: React.FunctionComponent<CodeProps> = ({
  language = "yaml",
  highlightTheme = null,
  value,
  copyButton,
  children,
}) => {
  const code = children ? children : value;
  if (!code) {
    return null;
  }

  const processedCode = (code as string)
    .replace(/&#60;/gm, "<")
    .replace(/^(\$ *)/gm, "");
  if (!processedCode.trim()) {
    return null;
  }

  const CpButton = (copyButton ? copyButton : CopyButton) as string;
  const cpButton = React.createElement(CpButton, {
    code: processedCode,
  });

  return (
    <div className={createElementClass("code-wrapper")}>
      {cpButton}
      <div className={createElementClass("code-pre-wrapper")}>
        <Highlight
          {...defaultProps}
          code={processedCode}
          theme={highlightTheme}
          language={language as Language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
            <pre
              className={`${createElementClass(
                "code-pre",
              )} ${createModifierClass(language, "code-pre")} ${className}`}
              style={style}
            >
              <code className={createElementClass("code")}>
                {tokens.map((line: any, i: number) => (
                  <div {...getLineProps({ line, key: i })} key={`${line}-${i}`}>
                    {line.map((token: any, key: number) => {
                      const tokenProps = getTokenProps({ token, key });

                      return !(
                        tokenProps.className.includes("plain") &&
                        !tokenProps.children
                      ) ? (
                        <span {...getTokenProps({ token, key })} />
                      ) : null;
                    })}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
