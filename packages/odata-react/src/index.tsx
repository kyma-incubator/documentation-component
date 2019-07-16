import React from "react";
import ReactDOM from "react-dom";
import ODataReact from "./ODataReact";
import { PageWrapper } from "./components/styled/styled";
import { mocks } from "./example/ODataFiles/index";
import { StyledOData } from "./CustomStyles";
import "fiori-fundamentals/dist/fiori-fundamentals.min.css";

ReactDOM.render(
  <PageWrapper>
    <StyledOData>
      <ODataReact schema={mocks.ODataFav1} />
    </StyledOData>
  </PageWrapper>,
  document.getElementById("root"),
);
