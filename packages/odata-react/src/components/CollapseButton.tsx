import React, { useState, useEffect } from "react";

import { bemClasses } from "../helpers";
import { COLLAPSE_ALL_TEXT, EXPAND_ALL_TEXT } from "../constants";
import { useExpandedContext } from "../store";

export const CollapseButton = () => {
  const {
    expanded,
    setExpanded,
    numberOfElements,
    numberOfExpanded,
  } = useExpandedContext();
  const [intiial, setInitial] = useState<boolean>(false);
  const text = expanded ? COLLAPSE_ALL_TEXT : EXPAND_ALL_TEXT;

  useEffect(() => {
    setInitial(true);
  }, []);

  useEffect(() => {
    if (!intiial) {
      return;
    }

    if (numberOfExpanded === 0 && expanded) {
      setExpanded(false);
    }
    if (numberOfExpanded === numberOfElements && !expanded) {
      setExpanded(true);
    }
    // eslint-disable-next-line
  }, [numberOfExpanded]);

  const classes = bemClasses.concatenate([
    bemClasses.element("collapse-button"),
    expanded ? bemClasses.modifier("expanded", "collapse-button") : "",
  ]);

  return (
    <button className={classes} onClick={() => setExpanded(state => !state)}>
      {text}
    </button>
  );
};
