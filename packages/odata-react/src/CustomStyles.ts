import styled from "styled-components";

export const StyledOData = styled.main`
  && {
    * {
      font-family: "72";
    }

    section.odata-root {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    button.collapse-button {
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.43;
      letter-spacing: normal;
      align-self: flex-end;
      border-radius: 4px;
      border: solid 1px #0a6ed1;
      background-color: white;
      color: #0a6ed1;
      transition: background-color 0.2s ease-in-out;
      :hover {
        background-color: #0a6ed1;
        color: white;
      }
    }

    section.table-wrapper {
      margin-bottom: 16px;
      border-radius: 4px;
      border: solid 1px #97979742;
      & > div.table-panel {
        border-radius: 4px;
        & > div.table-header-wrapper {
          border-top: none;
          border-radius: 4px;
        }
      }
    }

    h1.fd-panel__title {
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.43;
      letter-spacing: normal;
      color: #32363a;
    }

    tr.table-row {
      border-radius: 4px;
      & > td.table-cell {
        border-radius: 4px;
      }
      th.table-head-cell {
        background-color: #f3f4f573;
      }
    }
    td.table-cell {
      & > table.styled-table {
        border-collapse: collapse;
        border-radius: 5px;
        > thead.table-head {
          border: 1px solid #97979742;
        }
        > tbody.table-body {
          border: 1px solid #97979742;
        }
      }
    }
  }
`;
