import React, { useState } from "react";
import { Form, Input, Button, Card, notification } from "antd";

const ForgetForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    const { username, email } = values;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex(
      (u) => u.username === username && u.email === email
    );

    if (idx !== -1) {
      users[idx].password = "123456";
      localStorage.setItem("users", JSON.stringify(users));
      alert("Password reset successful. New password: 123456");
    } else {
      alert("Account not found. Incorrect username or email!");
    }

    setTimeout(() => {
      notification.info({
        key: "forget-info",
        message: "Request processed",
        description: "Your password reset request has been handled.",
      });
    }, 500);

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Card title="Forgot Password" style={{ width: 400 }}>
        <Form name="forget" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter a username!" }]}
          >
            <Input />
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
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetForm;
