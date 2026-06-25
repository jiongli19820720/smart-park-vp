import { useState } from "react";
import { Layout } from "antd";
import NavMenu from "../../components/NavMenu";
import NavBreadcrumb from "../../components/NavBreadcrumb";
import NavHeader from "../../components/NavHeader";

const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <div className="dashboard">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <NavMenu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <NavHeader />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <NavBreadcrumb />
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{currentYear} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Dashboard;
