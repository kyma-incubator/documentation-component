import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { createElementClass, createModifierClass } from "../../../helpers";

export interface CodeProps {
  language: string;
  value: string;
}

export const Code: React.FunctionComponent<CodeProps> = ({
  language = "javascript",
  value,
  children,
}) => {
  const code = children ? children : value;
  if (!code) {
    return null;
  }

  const processedCode = (code as string)
    .replace(/&#60;/gm, "<")
    .replace(/^(\$ *)/gm, "");
  if (!processedCode.replace(/ /g, "")) {
    return null;
  }

  return (
    <div className={createElementClass("code-wrapper")}>
      <div className={createElementClass("code-pre-wrapper")}>
        <Highlight
          {...defaultProps}
          code={processedCode}
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
                  <div {...getLineProps({ line, key: i })}>
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
