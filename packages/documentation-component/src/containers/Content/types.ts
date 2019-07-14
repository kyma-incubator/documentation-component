import React from "react";
import { Source } from "../../interfaces";

export interface SingleRendererComponent {
  source: Source;
  renderedContent: React.ReactNode;
  isGroup: boolean;
}

export interface GroupRendererComponent {
  sources: Source[];
}

export interface SingleRenderer {
  sourceType: string[];
  component: React.ReactNode;
}

export interface Renderers {
  single?: SingleRenderer[];
  group?: React.ReactNode;
}
