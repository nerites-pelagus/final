import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const hasAdmin = users.some((u) => u.role === "admin");
    if (!hasAdmin) {
      users.push({
        username: "admin",
        password: "admin123",
        email: "admin@system.com",
        phonenumber: "0000000000",
        role: "admin",
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    const { username, password } = values;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      message.success("Login successful!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(user.role === "admin" ? "/admin" : "/user");
    } else {
      alert("Incorrect username or password!");
    }

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Card title="Login" style={{ width: 400 }}>
        <Form name="login" onFinish={onFinish} layout="vertical">
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
          <div style={{ marginBottom: 16, textAlign: "right" }}>
            <Link to="/forget">Forgot password?</Link>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" block onClick={() => navigate("/register")}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
