import React from "react";
import styled from "styled-components";
import { Icon } from "fundamental-react";

interface StyledProps {
  open?: boolean;
  blueArrow?: boolean;
}

interface IconProps {
  clickHandler: () => void;
}

export const CollapseArrow: React.FunctionComponent<
  StyledProps & IconProps
> = ({ open, blueArrow, clickHandler }) => (
  <Wrapper open={open} blueArrow={blueArrow}>
    <Icon clickHandler={clickHandler} />
  </Wrapper>
);

const Wrapper = styled.section<StyledProps>`
  && {
    span {
      margin-left: 5px;
      position: relative;
      display: inline-block;
      cursor: pointer;
      transform: rotate(90deg);
      ${props => props.blueArrow && "color: #0a6ed1;"};
      &:before {
        transition: 0.4s ease;
        ${props => props.open && "transform: rotate(-180deg);"};
      }
    }
  }
`;
CollapseArrow.displayName = "CollapseArrow";
