import React from "react";
import ReactDOM from "react-dom";
import ODataReact from "./ODataReact";
import { StyledOData } from "./CustomStyles";
import { PageWrapper } from "./components/styled/styled";
import { mocks } from "./example/ODataFiles/index";
import "fiori-fundamentals/dist/fiori-fundamentals.min.css";

ReactDOM.render(
  <PageWrapper>
    <StyledOData>
      <ODataReact schema={mocks.ODataProductV4} />
    </StyledOData>
  </PageWrapper>,
  document.getElementById("root"),
);
