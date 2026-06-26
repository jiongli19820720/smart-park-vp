import { find, flatMap, indexBy } from "remeda";

const menuList = [
  {
    icon: "DashboardOutlined",
    label: "工作台",
    key: "/dashboard",
  },
  {
    icon: "TeamOutlined",
    label: "租户管理",
    key: "/users",
    children: [
      {
        icon: "UnorderedListOutlined",
        label: "租户列表",
        key: "/users/list",
      },
      {
        icon: "UserAddOutlined",
        label: "新增租户",
        key: "/users/add",
      },
    ],
  },
  {
    icon: "DollarOutlined",
    label: "财务管理",
    key: "/finance",
    children: [
      {
        icon: "ProfileOutlined",
        label: "合同管理",
        key: "/finance/contract",
      },
      {
        icon: "FileTextOutlined",
        label: "账单管理",
        key: "/finance/bill",
      },
    ],
  },
];

function flattenMenu(items, parentKey = null) {
  return flatMap(items, (item) => {
    const currentItem = {
      key: item.key,
      label: item.label,
      parentKey,
    };

    if (!item.children) {
      return [currentItem];
    }

    return [currentItem, ...flattenMenu(item.children, item.key)];
  });
}

function getLabelPathByKey(menuMap, key) {
  const labels = [];
  let currentItem = menuMap[key];

  while (currentItem) {
    labels.unshift(currentItem.label);
    currentItem = currentItem.parentKey ? menuMap[currentItem.parentKey] : undefined;
  }

  return labels;
}

const flatMenus = flattenMenu(menuList);
const menuMap = indexBy(flatMenus, (item) => item.key);
const targetMenu = find(flatMenus, (item) => item.key === "/finance/bill");
const labelPath = getLabelPathByKey(menuMap, "/finance/bill");

console.log("原始菜单树:");
console.log(JSON.stringify(menuList, null, 2));

console.log("\n拍平后的菜单:");
console.log(flatMenus);

console.log("\n通过 Remeda find 找 /finance/bill:");
console.log(targetMenu);

console.log("\n通过 Remeda indexBy 生成的 menuMap:");
console.log(menuMap);

console.log("\n/finance/bill 对应的面包屑 labels:");
console.log(labelPath);
