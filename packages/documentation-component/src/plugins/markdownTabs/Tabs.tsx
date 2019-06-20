import React, { useState } from "react";
import { createElementClass } from "../../helpers";
import { Tab, TabProps } from "./Tab";

export interface TabsProps {
  className?: string;
  active?: number;
}

export const Tabs: React.FunctionComponent<TabsProps> = ({
  className = "",
  active = 0,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(active);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const renderHeader = (ch: Array<React.ReactElement<TabProps>>) =>
    React.Children.map(ch, (child, index) => {
      const c = child as React.ReactElement<TabProps>;
      return React.cloneElement(c, {
        key: index,
        label: c.props.label,
        parentCallback: handleTabClick,
        tabIndex: index,
        isActive: index === activeTab,
      });
    });

  const renderActiveTab = (ch: Array<React.ReactElement<TabProps>>) =>
    ch[activeTab] ? ch[activeTab].props.children : null;

  const content = []
    .concat(...(children as any))
    .filter(child => child !== null && child !== undefined);

  return (
    <div className={createElementClass("tabs")}>
      <ul className={createElementClass("tabs-header")}>
        {renderHeader(content)}
      </ul>
      <div className={createElementClass("tabs-content")}>
        {renderActiveTab(content)}
      </div>
    </div>
  );
};
