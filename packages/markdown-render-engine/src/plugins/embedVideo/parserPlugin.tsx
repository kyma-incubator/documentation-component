import React from "react";
import ReactPlayer from "react-player";
import {
  MarkdownRenderEngineOptions,
  MarkdownParserPluginReturnType,
} from "../../types";
import { createElementClass, createModifierClass } from "../../helpers";

export const embedVideoParser = (
  args: MarkdownRenderEngineOptions,
): MarkdownParserPluginReturnType => ({
  replaceChildren: true,
  shouldProcessNode: (node: any) =>
    node.type === "tag" &&
    node.name === "div" &&
    node.attribs &&
    node.attribs.hasOwnProperty("video-link") &&
    node.attribs.hasOwnProperty("video-type"),
  processNode: (node: any) => {
    const type = node.attribs["video-type"];
    const url = node.attribs["video-link"];

    if (!type || !url) {
      return null;
    }

    return (
      <ReactPlayer
        className={`${createElementClass("video")} ${createModifierClass(
          type,
          "video",
        )}`}
        url={url}
      />
    );
  },
});
