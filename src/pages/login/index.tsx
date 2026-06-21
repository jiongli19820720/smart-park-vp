import "./index.scss";
import type { FormProps } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import { userLogin } from "../../api/users";
import bg from "../../assets/bg.jpg";
import lgbg from "../../assets/lgbg.jpg";
import logo from "../../assets/logo.png";

type FieldType = {
  username: string;
  password: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
  try {
    const res = await userLogin(values);
    console.log("登录成功:", res);
  } catch (err) {
    console.log("登录失败:", err);
  }
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  const [form] = Form.useForm<FieldType>();

  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }}>
        <div className="part">
          <div className="title">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <h1>智慧园区管理平台</h1>
          </div>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input placeholder="请输入你的用户名" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="请输入你的密码" prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
