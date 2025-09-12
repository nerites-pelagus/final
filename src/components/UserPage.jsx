import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";

const UserPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [form] = Form.useForm();
  const [user, setUser] = useState(currentUser);

  const onFinish = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex((u) => u.username === user.username);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...values };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(users[idx]));
      setUser(users[idx]);
      message.success("Update successful!");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Card title="Personal Information" style={{ width: 400 }}>
        <Form form={form} initialValues={user} onFinish={onFinish} layout="vertical">
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phonenumber">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserPage;
