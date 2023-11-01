import { Data } from "../data";

export interface TreeData {
  id: number | null;
  name: string;
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
