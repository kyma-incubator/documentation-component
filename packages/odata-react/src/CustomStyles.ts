import styled from "styled-components";

export const StyledOData = styled.main`
  && {
    * {
      font-family: "72";
    }

    section.ODataRoot {
      display: flex;
      flex-direction: column;
      padding: 20px; /* TODO: check this later */
    }

    button.CollapseButton {
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

    section.TableWrapper {
      margin-bottom: 16px;
      border-radius: 4px;
      border: solid 1px #97979742;
      & > div.TablePanel {
        border-radius: 4px;
        & > div.TableHeaderWrapper {
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

    tr.TableRow {
      border-radius: 4px;
      & > td.TableCell {
        border-radius: 4px;
      }
      th.TableHeadCell {
        background-color: #f3f4f573;
      }
    }
    .TableCell {
      & > table.StyledTable {
        table-layout: fixed;
        border-collapse: collapse;
        border-radius: 5px;
        > thead.TableHead {
          border: 1px solid #97979742;
        }
        > tbody.TableBody {
          border: 1px solid #97979742;
        }
      }
    }
  }
`;
