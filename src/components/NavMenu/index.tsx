import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { setBreadcrumbLabels } from "../../store/slices/breadcrumbSlice";
import type { RootState } from "../../store";

import { menuConfig } from "./menuItem";
import { filterMenuByRole } from "../../utils/filterMenuByRole";
import getLabelsByKeyPath from "../../utils/getLabelsByKeyPath";

function NavMenu() {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);
  const menus = useMemo(() => filterMenuByRole(menuConfig, role), [role]);

  useEffect(() => {
    const labels = getLabelsByKeyPath(menus, ["1", "sub1"]);
    dispatch(setBreadcrumbLabels(labels));
  }, [dispatch, menus]);

  const onClick: MenuProps["onClick"] = (e) => {
    const labels = getLabelsByKeyPath(menus, e.keyPath);
    dispatch(setBreadcrumbLabels(labels));
  };

  return (
    <Menu
      onClick={onClick}
      theme="dark"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={menus}
    />
  );
}

export default NavMenu;
