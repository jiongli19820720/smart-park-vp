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

export interface ApiMenuItem {
  icon?: string;
  label: string;
  key: string;
  children?: ApiMenuItem[];
}

type MenuItem = Required<MenuProps>["items"][number];

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

export function transformMenuItems(items: ApiMenuItem[]): MenuItem[] {
  return items.map((item) => {
    const children = item.children ? transformMenuItems(item.children) : undefined;

    return {
      key: item.key,
      label: item.label,
      icon: item.icon ? iconMap[item.icon] : undefined,
      children,
    };
  });
}
