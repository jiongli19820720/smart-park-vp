import type { FormProps } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { userLogin } from "../../api/users";

import bg from "../../assets/bg.jpg";
import lgbg from "../../assets/lgbg.jpg";
import logo from "../../assets/logo.png";

type FieldType = {
  username: string;
  password: string;
};

function Login() {
  const [form] = Form.useForm<FieldType>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoding] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoding(true);
      const res = await userLogin(values);
      dispatch(setToken(res.data.token));
      setLoding(false);
      void navigate("/", { replace: true });
      console.log("登录成功:", res);
    } catch (err) {
      setLoding(false);
      console.log("登录失败:", err);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="login flex h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="lgbg h-180 w-300 bg-top-left bg-no-repeat"
        style={{ backgroundImage: `url(${lgbg})` }}
      >
        <div className="part ml-auto h-180 w-100 bg-white px-8 pt-36">
          <div className="title mb-12">
            <div className="logo flex items-center justify-center">
              <img src={logo} alt="Logo" />
            </div>
            <h1 className="mt-8 text-center text-[#027cc5]">智慧园区管理平台</h1>
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
              <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
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
