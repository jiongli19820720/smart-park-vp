import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function NavBreadcrumb() {
  const labels = useSelector((state: RootState) => state.breadcrumb.labels);

  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={labels.map((label) => ({ title: label }))} />
  );
}

export default NavBreadcrumb;
