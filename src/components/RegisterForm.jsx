import React from "react";
import { Form, Input, Button, Card, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.username === values.username)) {
      alert("Username already exists!");
      setTimeout(() => {
        message.info({ content: "Registration attempt processed.", key: "register-info" });
      }, 500);
      return;
    }

    if (values.role === "admin") {
      alert("Cannot register an admin account!");
      setTimeout(() => {
        message.info({ content: "Registration attempt processed.", key: "register-info" });
      }, 500);
      return;
    }

    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");

    setTimeout(() => {
      message.info({ content: "Registration attempt processed.", key: "register-info" });
    }, 500);

    navigate("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Card title="Register" style={{ width: 400 }}>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter a username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter an email!" },
              { type: "email", message: "Invalid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phonenumber"
            rules={[{ required: true, message: "Please enter a phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" initialValue="user">
            <Radio.Group>
              <Radio value="user">User</Radio>
              <Radio value="admin" disabled>
                Admin
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm;

