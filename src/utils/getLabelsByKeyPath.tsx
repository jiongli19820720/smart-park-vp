import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getLabelsByKeyPath(items: MenuItem[], keyPath: string[]) {
  const labels: React.ReactNode[] = [];
  let currentItems = items;

  for (const key of [...keyPath].reverse()) {
    const item = currentItems.find((item) => {
      return item && "key" in item && item.key === key;
    });

    if (!item) break;

    if ("label" in item) {
      labels.push(item.label);
    }

    if ("children" in item && item.children) {
      currentItems = item.children;
    }
  }

  return labels;
}

export default getLabelsByKeyPath;
