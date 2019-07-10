import React from "react";
import ReactDOM from "react-dom";
import ODataReact from "./ODataReact";
import { PageWrapper } from "./components/styled/styled";
import { mocks } from "./example/ODataFiles/index";
import "fiori-fundamentals/dist/fiori-fundamentals.min.css";

ReactDOM.render(
  <PageWrapper>
    <ODataReact schema={mocks.ODataFav5} />
  </PageWrapper>,
  document.getElementById("root"),
);
