import React, { useState } from "react";
import { request } from "../../util/api";
import { Button, Form, message, Input, Checkbox, Spin } from "antd";
import "./LoginPage.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function LoginPage() {

  const [loading,setLoading] = useState(false)

  const onFinish = (fields) => {
    var params = {
      username: fields.username,
      password: fields.password,
    };
    setLoading(true)
    request("post", "customer/login", params).then((res) => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
      
      if (res.data && res.data.is_login) {
        localStorage.setItem("is_login", "1"); // is_login = 1
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        window.location.href = "/";
      } else {
        message.warning(res.data.message);
      }
    });
  };

  return (
    <div className="loging-form">
      <h1>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <div className="login-form-forgot">
          <a href="">Forgot password</a>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          <div>
            Or <a href="">register now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );

}
