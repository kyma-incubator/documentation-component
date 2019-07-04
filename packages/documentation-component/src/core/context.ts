import React from "react";
import createUseContext from "constate";
import { runPlugins } from "./system";
import { Context as C, Options, Source, PureSources } from "../interfaces";

const Container = (context: Options): C => {
  const preProcessedSources: PureSources = runPlugins(
    context.sources,
    context.plugins,
  );

  return {
    sources: preProcessedSources,
    renderEngines: context.renderEngines,
  };
};

const { Provider, Context } = createUseContext(Container);
const DC = { Provider, Context };

export { DC, Provider, Context };
