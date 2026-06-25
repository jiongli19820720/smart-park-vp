import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function findPathByKey(items: MenuItem[], targetKey: string): MenuItem[] {
  for (const item of items) {
    if (!item) continue;

    if ("key" in item && item.key === targetKey) {
      return [item];
    }

    if ("children" in item && item.children) {
      const childPath = findPathByKey(item.children, targetKey);

      if (childPath.length > 0) {
        return [item, ...childPath];
      }
    }
  }

  return [];
}

function getLabelsByKeyPath(items: MenuItem[], keyPath: string[]) {
  const labels: React.ReactNode[] = [];
  let currentItems = items;

  for (const key of [...keyPath].reverse()) {
    const itemPath = findPathByKey(currentItems, key);
    const item = itemPath.at(-1);

    if (!item) break;

    for (const pathItem of itemPath) {
      if (pathItem && "label" in pathItem) {
        labels.push(pathItem.label);
      }
    }

    if ("children" in item && item.children) {
      currentItems = item.children;
    } else {
      currentItems = [];
    }
  }

  return labels;
}

export default getLabelsByKeyPath;
