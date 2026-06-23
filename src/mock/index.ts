import Mock from "mockjs";

const users = [
  {
    username: "admin",
    password: "123456",
    token: "mock-token-admin",
    name: "管理员",
    role: "admin",
  },
  {
    username: "manager",
    password: "123456",
    token: "mock-token-manager",
    name: "园区经理",
    role: "manager",
  },
  {
    username: "user",
    password: "123456",
    token: "mock-token-user",
    name: "普通用户",
    role: "user",
  },
];

Mock.mock("https://www.demo.com/login", "post", (options) => {
  const body = JSON.parse(options.body);
  const user = users.find(
    (item) => item.username === body.username && item.password === body.password,
  );

  if (user) {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: user.token,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    };
  }

  return {
    code: 401,
    message: "用户名或密码错误",
    data: null,
  };
});
