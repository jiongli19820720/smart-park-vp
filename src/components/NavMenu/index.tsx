import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBreadcrumbLabels } from "../../store/slices/breadcrumbSlice";

import { menuConfig } from "./menuItem";
import getLabelsByKeyPath from "../../utils/getLabelsByKeyPath";

function NavMenu() {
  const dispatch = useDispatch();

  useEffect(() => {
    const labels = getLabelsByKeyPath(menuConfig, ["1", "sub1"]);
    dispatch(setBreadcrumbLabels(labels));
  }, [dispatch]);

  const onClick: MenuProps["onClick"] = (e) => {
    const labels = getLabelsByKeyPath(menuConfig, e.keyPath);
    dispatch(setBreadcrumbLabels(labels));
  };

  return (
    <Menu
      onClick={onClick}
      theme="dark"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={menuConfig}
    />
  );
}

export default NavMenu;
