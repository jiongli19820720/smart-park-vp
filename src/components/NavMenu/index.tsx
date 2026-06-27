import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setBreadcrumbLabels } from "../../store/slices/breadcrumbSlice";

import { getMenuList } from "../../api/menus";
import { getLabelsByKeyPath, transformMenuItems } from "../../utils/transformMenuItems";

type MenuItem = Required<MenuProps>["items"][number];

function NavMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const initialPathname = useRef(location.pathname);
  const selectedKey = location.pathname === "/" ? "/dashboard" : location.pathname;

  useEffect(() => {
    async function loadMenus() {
      const res = await getMenuList();
      const nextMenus = transformMenuItems(res.data);

      setMenus(nextMenus);

      const navigation = performance.getEntriesByType("navigation")[0];
      const isReload =
        navigation instanceof PerformanceNavigationTiming && navigation.type === "reload";

      if (isReload && initialPathname.current !== "/dashboard") {
        void navigate("/dashboard", { replace: true });
      }
    }

    void loadMenus();
  }, [navigate]);

  useEffect(() => {
    if (menus.length === 0) return;

    dispatch(setBreadcrumbLabels(getLabelsByKeyPath(menus, [selectedKey])));
  }, [dispatch, menus, selectedKey]);

  const onClick: MenuProps["onClick"] = (e) => {
    const labels = getLabelsByKeyPath(menus, e.keyPath);
    dispatch(setBreadcrumbLabels(labels));
    void navigate(e.key);
  };

  return (
    <Menu onClick={onClick} theme="dark" selectedKeys={[selectedKey]} mode="inline" items={menus} />
  );
}

export default NavMenu;
