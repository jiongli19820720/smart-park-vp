import { useLocation } from "react-router-dom";

function MenuPlaceholder() {
  const location = useLocation();

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "#fff",
      }}
    >
      当前页面：{location.pathname}
    </div>
  );
}

export default MenuPlaceholder;
