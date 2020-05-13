import React from "react";
import { Icon } from "fundamental-react";

import { bemClasses } from "../helpers";

export interface IconProps {
  clickHandler: () => void;
  open?: boolean;
  blueArrow?: boolean;
}

export const CollapseArrow: React.FunctionComponent<IconProps> = ({
  open = false,
  blueArrow = false,
  clickHandler,
}) => {
  const className = `collapse-arrow`;
  const classes = bemClasses.concatenate([
    bemClasses.element(className),
    blueArrow ? bemClasses.modifier(`blue-arrow`, className) : "",
    open ? bemClasses.modifier(`open`, className) : "",
  ]);

  return (
    <div className={classes}>
      <Icon
        size="l"
        glyph="feeder-arrow"
        onClick={(e: any) => {
          e.stopPropagation();
          clickHandler();
        }}
      />
    </div>
  );
};
