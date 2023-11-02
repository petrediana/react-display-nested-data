import React, { useCallback, useState } from "react";
import { transformDataToTree, TreeData } from "./utils";
import { response } from "./data";

function App() {
  const [data, setData] = useState<TreeData[]>(transformDataToTree(response));
  const [isExpanded, setIsExpanded] = useState<Record<number, boolean>>({});

  const handleOnClickItem = useCallback(
    (item: TreeData): void => {
      const currentItemOpenState = isExpanded[item.id] || false;
      setIsExpanded((prev) => {
        return {
          ...prev,
          [item.id]: !currentItemOpenState,
        };
      });
    },
    [isExpanded],
  );

  const renderItem = (items: TreeData[]): JSX.Element => {
    return (
      <div>
        {items.map((item) => (
          <div key={`${item.name}-${item.id}`} style={{ paddingLeft: "1rem" }}>
            <span onClick={() => handleOnClickItem(item)}>
              {item.children.length > 0
                ? isExpanded[item.id]
                  ? "V"
                  : ">"
                : null}
            </span>
            <input type="checkbox" />
            {item.name}
            {isExpanded[item.id] && renderItem(item.children)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ border: "solid black 1px", padding: "1rem", width: "10rem" }}>
      {renderItem(data)}
    </div>
  );
}

export default App;
