import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export type PermissionMenuItem = MenuItem & {
  roles?: string[];
  children?: PermissionMenuItem[];
};

export function filterMenuByRole(items: PermissionMenuItem[], role: string | null): MenuItem[] {
  return items.reduce<MenuItem[]>((menus, item) => {
    if (!item) return menus;

    const hasRoles = "roles" in item && item.roles && item.roles.length > 0;
    const canView = !hasRoles || Boolean(role && item.roles?.includes(role));

    if (!canView) return menus;

    const { roles: _roles, ...menuItem } = item;

    if ("children" in item && item.children) {
      const children = filterMenuByRole(item.children, role);

      if (children.length === 0) return menus;

      menus.push({
        ...menuItem,
        children,
      } as MenuItem);

      return menus;
    }

    menus.push(menuItem as MenuItem);
    return menus;
  }, []);
}
