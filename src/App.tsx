import React, { useCallback, useMemo, useState } from "react";
import { transformDataToHashMap, transformDataToTree, TreeData } from "./utils";
import { response } from "./data";

function App() {
  const [isExpanded, setIsExpanded] = useState<Record<number, boolean>>({});
  const [isChecked, setIsChecked] = useState<Record<number, boolean>>({});

  const data = useMemo((): TreeData[] => transformDataToTree(response), []);
  const hashMappedData = useMemo(
    (): Record<number, TreeData> => transformDataToHashMap(response),
    [],
  );

  const handleOnClickItem = useCallback(
    (item: TreeData): void => {
      const currentItemExpandedState = isExpanded[item.id] || false;
      setIsExpanded((prev) => {
        return {
          ...prev,
          [item.id]: !currentItemExpandedState,
        };
      });
    },
    [isExpanded],
  );

  const checkParents = useCallback(
    (item: TreeData, checkedMap: Record<number, boolean>): void => {
      if (!item) return;
      checkedMap[item.id] = true;
      if (item.parentId) {
        checkParents(hashMappedData[item.parentId], checkedMap);
      }
    },
    [hashMappedData],
  );

  const uncheckChildren = useCallback(
    (item: TreeData, checkedMap: Record<number, boolean>): void => {
      if (!item) return;
      checkedMap[item.id] = false;
      if (item.children.length > 0) {
        item.children.forEach((child) => {
          uncheckChildren(child, checkedMap);
        });
      }
    },
    [],
  );

  const handleOnCheckItem = useCallback(
    (item: TreeData): void => {
      const currentItemCheckedState = isChecked[item.id] || false;
      const isCheckedCopy = { ...isChecked };

      if (!currentItemCheckedState) {
        checkParents(item, isCheckedCopy);
      } else {
        uncheckChildren(item, isCheckedCopy);
      }

      setIsChecked(isCheckedCopy);
    },
    [checkParents, isChecked, uncheckChildren],
  );

  const renderItem = useCallback(
    (items: TreeData[]): JSX.Element => {
      return (
        <div>
          {items.map((item) => (
            <div
              key={`${item.name}-${item.id}`}
              style={{ paddingLeft: "1rem" }}
            >
              <span onClick={() => handleOnClickItem(item)}>
                {item.children.length > 0
                  ? isExpanded[item.id]
                    ? "V"
                    : ">"
                  : null}
              </span>
              <input
                type="checkbox"
                onChange={() => handleOnCheckItem(item)}
                checked={isChecked[item.id] || false}
              />
              {item.name}
              {isExpanded[item.id] && renderItem(item.children)}
            </div>
          ))}
        </div>
      );
    },
    [handleOnCheckItem, handleOnClickItem, isChecked, isExpanded],
  );

  return (
    <div style={{ border: "solid black 1px", padding: "1rem", width: "11rem" }}>
      {renderItem(data)}
    </div>
  );
}

export default App;
