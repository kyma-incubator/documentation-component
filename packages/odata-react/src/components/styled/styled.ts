import styled from "styled-components";
import { Button, Icon, Panel, PanelHeader, Table } from "fundamental-react";
export { CollapseArrow } from "./CollapseArrow";

export const AppWrapper = styled.section.attrs(() => ({
  className: "odata-root",
}))``;

AppWrapper.displayName = "AppWrapper";

export const StyledTable = styled.table.attrs(() => ({
  className: "styled-table",
}))`
  font-size: 14px;
  line-height: 1.42857;
  color: #32363a;
  font-family: "72", Arial, Helvetica, sans-serif;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin-bottom: 12px;
  border-style: solid;
  border-width: 1px;
  color: #32363a;
  margin-bottom: 0;
  border: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  > tbody > tr {
    border: none;
    cursor: auto;
    background-color: #ffffff;
  }
  :last-child {
    margin-bottom: 0;
    margin-right: 0;
  }
`;

StyledTable.displayName = "StyledTable";

export const TableHead = styled.thead.attrs(() => ({
  className: "table-head",
}))`
  font-size: 0.85714rem;
  line-height: 1.33333;
  font-weight: 400;
  text-transform: uppercase;
  border-bottom: solid 1px #eeeeef;
  border-top: solid 1px #eeeeef;
  background-color: #fafafa;
  color: #6a6d70;
  > tr {
    cursor: auto;
  }
`;
TableHead.displayName = "TableHead";

export const PageWrapper = styled.section.attrs(() => ({
  className: "page-wrapper",
}))`
  margin: 20px;
`;
PageWrapper.displayName = "PageWrapper";

export const TableBody = styled.tbody.attrs(() => ({
  className: "table-body",
}))``;

TableBody.displayName = "TableBody";

export const TableHeadCell = styled.th.attrs(() => ({
  className: "table-head-cell",
}))`
  text-align: left;
  padding: 16px 20px;
  border: none;
  font-weight: 400;
`;

TableHeadCell.displayName = "TableHeadCell";

export const TableRow = styled.tr.attrs(() => ({
  className: "table-row",
}))`
  transition: background-color 125ms ease-in;
`;
TableRow.displayName = "TableRow";

export const TableCell = styled.td.attrs(() => ({
  className: "table-cell",
}))`
  text-align: left;
  padding: 16px 20px;
`;
TableCell.displayName = "TableCell";

export const LeftAlignedHeader = styled.th.attrs(() => ({
  className: "left-aligned-header",
}))`
  text-align: left;
`;
LeftAlignedHeader.displayName = "LeftAlignedHeader";

export const StyledCode = styled.code.attrs(() => ({
  className: "styled-code",
}))``;
StyledCode.displayName = "StyledCode";

export const TableWrapper = styled.section.attrs(() => ({
  className: "table-wrapper",
}))``;

TableWrapper.displayName = "TableWrapper";

export const TableHeader = styled.p.attrs(() => ({
  className: "table-header",
}))`
  margin: 5px;
  font-size: 20px;
  font-weight: bold;
`;
TableHeader.displayName = "TableHeader";

export const TableContent = styled(Table).attrs(() => ({
  className: "table-content",
}))`
  && {
    margin-bottom: 0;
    border: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    > thead {
      border-bottom: solid 1px #eeeeef;
      border-top: solid 1px #eeeeef;

      > tr {
        cursor: auto;
      }
    }

    > tbody tr {
      border: none;
      cursor: auto;
    }
  }
`;
TableContent.displayName = "TableContent";

export const NotFoundMessage = styled.p.attrs(() => ({
  className: "not-found-message",
}))`
  width: 100%;
  font-size: 18px;
  padding: 20px 0;
  margin: 0 auto;
  text-align: center;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

NotFoundMessage.displayName = "NotFoundMessage";

Icon.defaultProps = {
  size: "l",
  glyph: "feeder-arrow",
};

export const CollapseButton = styled(Button).attrs(() => ({
  className: "collapse-button",
}))`
  && {
    padding: 0;
    min-width: 110px;
    margin-bottom: 20px;
  }
`;
CollapseButton.displayName = "CollapseButton";

Button.defaultProps = {
  option: "emphasized",
};

export const TablePanel = styled(Panel).attrs(() => ({
  className: "table-panel",
}))`
  && {
    box-shadow: none;
  }
`;
TablePanel.displayName = "TablePanel";

export const TableHeaderWrapper = styled(PanelHeader).attrs(() => ({
  className: "table-header-wrapper",
}))`
  && {
    border-top: solid 1px #eeeeef;
    border-bottom: none;
    box-shadow: none;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    :hover {
      background-color: #fafafa;
    }
  }
`;
TableHeaderWrapper.displayName = "TableHeaderWrapper";

export const TextOverflowWrapper = styled.div.attrs(() => ({
  className: "text-overflow-wrapper",
}))`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
TextOverflowWrapper.displayName = "TextOverflowWrapper";
