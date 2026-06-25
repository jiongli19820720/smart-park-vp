import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setBreadcrumbLabels } from "../../store/slices/breadcrumbSlice";

import { getMenuList } from "../../api/menus";
import getLabelsByKeyPath from "../../utils/getLabelsByKeyPath";
import { transformMenuItems } from "../../utils/transformMenuItems";

type MenuItem = Required<MenuProps>["items"][number];

function NavMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function loadMenus() {
      const res = await getMenuList();
      const nextMenus = transformMenuItems(res.data);

      setMenus(nextMenus);
      dispatch(setBreadcrumbLabels(getLabelsByKeyPath(nextMenus, ["/dashboard"])));
    }

    void loadMenus();
  }, [dispatch]);

  const onClick: MenuProps["onClick"] = (e) => {
    const labels = getLabelsByKeyPath(menus, e.keyPath);
    dispatch(setBreadcrumbLabels(labels));
    void navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      theme="dark"
      defaultSelectedKeys={["/dashboard"]}
      mode="inline"
      items={menus}
    />
  );
}

export default NavMenu;
