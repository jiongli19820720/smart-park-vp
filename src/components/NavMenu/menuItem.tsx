import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import type { PermissionMenuItem } from "../../utils/filterMenuByRole";

export const menuConfig: PermissionMenuItem[] = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    roles: ["admin", "user"],
    children: [
      { key: "1", label: "Option 1", roles: ["admin", "user"] },
      { key: "2", label: "Option 2", roles: ["admin"] },
      { key: "3", label: "Option 3", roles: ["admin"] },
      { key: "4", label: "Option 4", roles: ["user"] },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    roles: ["admin"],
    children: [
      { key: "5", label: "Option 5", roles: ["admin"] },
      { key: "6", label: "Option 6", roles: ["admin"] },
      {
        key: "sub3",
        label: "Submenu",
        roles: ["admin"],
        children: [
          { key: "7", label: "Option 7", roles: ["admin"] },
          { key: "8", label: "Option 8", roles: ["admin"] },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    roles: ["admin", "user"],
    children: [
      { key: "9", label: "Option 9", roles: ["admin", "user"] },
      { key: "10", label: "Option 10", roles: ["admin"] },
      { key: "11", label: "Option 11", roles: ["user"] },
      { key: "12", label: "Option 12", roles: ["admin", "user"] },
    ],
  },
];
