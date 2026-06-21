import Mock from "mockjs";

Mock.mock("https://www.demo.com/login", "post", (options) => {
  const body = JSON.parse(options.body);

  if (body.username === "admin" && body.password === "123456") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "mock-token",
      },
    };
  }

  return {
    code: 401,
    message: "用户名或密码错误",
    data: null,
  };
});
