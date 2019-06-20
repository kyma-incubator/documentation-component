import React from "react";
import ReactPlayer from "react-player";
import {
  createElementClass,
  createModifierClass,
  extractVideoLink,
} from "../../../helpers";

export interface InlineCodeProps {
  inline: boolean;
  value: string;
}

export const InlineCode: React.FunctionComponent<InlineCodeProps> = ({
  inline = true,
  value,
  children,
}) => {
  let videoProps: string[] | null = null;
  if (value) {
    videoProps = extractVideoLink(value);
  }

  return videoProps ? (
    <ReactPlayer
      className={`${createElementClass("video")} ${createModifierClass(
        videoProps[1],
        "video",
      )}`}
      url={videoProps[0]}
    />
  ) : (
    <code className={createElementClass("inline-code")}>
      {children === value ? value : children}
    </code>
  );
};
