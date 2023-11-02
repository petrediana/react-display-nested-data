import { Data } from "../data";

export interface TreeData extends Data {
  children: TreeData[];
}

export const transformDataToTree = (data: Data[]): TreeData[] => {
  const tree: TreeData[] = [];
  const hashMap: Record<number, TreeData> = {};

  data.forEach((item) => {
    hashMap[item.id] = {
      ...item,
      children: [],
    };
  });

  data.forEach((item) => {
    if (item.parentId) {
      const parent = hashMap[item.parentId];

      if (parent) {
        parent.children.push(hashMap[item.id]);
      }
    } else {
      tree.push(hashMap[item.id]);
    }
  });

  return tree;
};

export const transformDataToHashMap = (
  data: Data[],
): Record<number, TreeData> => {
  const hashMap: Record<number, TreeData> = {};

  data.forEach((dataPoint) => {
    hashMap[dataPoint.id] = { ...dataPoint, children: [] };
  });

  data.forEach((dataPoint) => {
    if (dataPoint.parentId) {
      const parent = hashMap[dataPoint.parentId];
      if (parent) {
        parent.children.push(hashMap[dataPoint.id]);
      }
    }
  });

  return hashMap;
};
