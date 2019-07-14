import React from "react";
import { createElementClass } from "../helpers";

export interface ImageProps {
  alt: string;
  src: string;
}

export const Image: React.FunctionComponent<ImageProps> = ({ alt, src }) => (
  <img src={src} alt={alt} className={createElementClass("image")} />
);
