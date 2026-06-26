import {
  BankOutlined,
  CommentOutlined,
  DashboardOutlined,
  DollarOutlined,
  FileTextOutlined,
  FrownOutlined,
  FundProjectionScreenOutlined,
  FundViewOutlined,
  InsertRowLeftOutlined,
  LaptopOutlined,
  ProfileOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  TransactionOutlined,
  TruckOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { first, flatMap, indexBy, map } from "remeda";

export interface ApiMenuItem {
  icon?: string;
  label: string;
  key: string;
  children?: ApiMenuItem[];
}

type MenuItem = Required<MenuProps>["items"][number];

interface FlatMenuItem {
  key: string;
  label: React.ReactNode;
  parentKey: string | null;
}

const iconMap: Record<string, React.ReactNode> = {
  BankOutlined: <BankOutlined />,
  CommentOutlined: <CommentOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  DollarOutlined: <DollarOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  FrownOutlined: <FrownOutlined />,
  FundProjectionScreenOutlined: <FundProjectionScreenOutlined />,
  FundViewOutlined: <FundViewOutlined />,
  InsertRowLeftOutlined: <InsertRowLeftOutlined />,
  LaptopOutlined: <LaptopOutlined />,
  ProfileOutlined: <ProfileOutlined />,
  ReadOutlined: <ReadOutlined />,
  SettingOutlined: <SettingOutlined />,
  TeamOutlined: <TeamOutlined />,
  ThunderboltOutlined: <ThunderboltOutlined />,
  ToolOutlined: <ToolOutlined />,
  TransactionOutlined: <TransactionOutlined />,
  TruckOutlined: <TruckOutlined />,
  UnorderedListOutlined: <UnorderedListOutlined />,
  UserAddOutlined: <UserAddOutlined />,
  UserOutlined: <UserOutlined />,
};

/**
 * 将后端返回的菜单数据转换成 Ant Design Menu 的 items 格式。
 * 后端 icon 是字符串，这里会通过 iconMap 转成真正的 React 图标节点。
 */
export function transformMenuItems(items: ApiMenuItem[]): MenuItem[] {
  return map(items, (item) => {
    const children = item.children ? transformMenuItems(item.children) : undefined;

    return {
      key: item.key,
      label: item.label,
      icon: item.icon ? iconMap[item.icon] : undefined,
      children,
    };
  });
}

/**
 * 将树形菜单拍平成一维数组，并保留 parentKey。
 * 拍平后可以配合 Remeda indexBy 生成查询表，避免每次点击菜单都逐层递归查找。
 */
function flattenMenuItems(items: MenuItem[], parentKey: string | null = null): FlatMenuItem[] {
  return flatMap(items, (item) => {
    if (!item || !("key" in item)) return [];

    const key = String(item.key);
    const label = "label" in item ? item.label : "";
    const currentItem: FlatMenuItem = {
      key,
      label,
      parentKey,
    };

    if (!("children" in item) || !item.children) {
      return currentItem;
    }

    return [currentItem, ...flattenMenuItems(item.children, key)];
  });
}

/**
 * 根据 antd Menu 点击事件提供的 keyPath 生成面包屑 labels。
 * keyPath 的第一个值是当前点击项，这里用拍平后的 menuMap 反查父级链路。
 */
export function getLabelsByKeyPath(items: MenuItem[], keyPath: string[]) {
  const currentKey = first(keyPath);

  if (!currentKey) return [];

  const menuMap = indexBy(flattenMenuItems(items), (item) => item.key);
  const labels: React.ReactNode[] = [];
  let currentItem: FlatMenuItem | undefined = menuMap[currentKey];

  while (currentItem) {
    labels.unshift(currentItem.label);
    currentItem = currentItem.parentKey ? menuMap[currentItem.parentKey] : undefined;
  }

  return labels;
}
