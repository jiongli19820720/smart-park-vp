import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { map } from "remeda";
import type { RootState } from "../../store";

function NavBreadcrumb() {
  const labels = useSelector((state: RootState) => state.breadcrumb.labels);

  return (
    // 将 Redux 中保存的 label 数组转换成 Ant Design Breadcrumb 需要的 items。
    <Breadcrumb style={{ margin: "16px 0" }} items={map(labels, (label) => ({ title: label }))} />
  );
}

export default NavBreadcrumb;
