// src/components/LoginForm.jsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { findUser, setCurrentUserToStorage, getUsersFromStorage, ensureAdminExists } from "../utils/auth";

const LoginForm = ({ onLogin, onNavigate }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ensureAdminExists();
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    const users = getUsersFromStorage();
    const user = users.find(u => u.username === values.username && u.password === values.password);
    setTimeout(() => {
      if (user) {
        message.success("Login successful");
        setCurrentUserToStorage(user);
        onLogin(user);
      } else {
        message.error("Incorrect username or password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Card title="Login" style={{ width: 375, fontSize: 50 }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <div style={{ textAlign: "right", marginBottom: 12 }}>
            <a onClick={() => onNavigate("forget")}>Forgot password?</a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>Login</Button>
            </Form.Item>

            <Form.Item >
              <Button onClick={() => onNavigate("register")} block>Register</Button>
            </Form.Item>
          </div>

        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;

// import React, { useState, useEffect } from "react";
// import { Form, Input, Button, Card, message } from "antd";
// import { useNavigate, Link } from "react-router-dom";

// const LoginForm = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const hasAdmin = users.some((u) => u.role === "admin");
//     if (!hasAdmin) {
//       users.push({
//         username: "admin",
//         password: "admin123",
//         email: "admin@system.com",
//         phonenumber: "0000000000",
//         role: "admin",
//       });
//       localStorage.setItem("users", JSON.stringify(users));
//     }
//   }, []);

//   const onFinish = (values) => {
//     setLoading(true);
//     const { username, password } = values;

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const user = users.find(
//       (u) => u.username === username && u.password === password
//     );

//     if (user) {
//       message.success("Login successful!");
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       navigate(user.role === "admin" ? "/admin" : "/user");
//     } else {
//       alert("Incorrect username or password!");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
//       <Card title="Login" style={{ width: 400 }}>
//         <Form name="login" onFinish={onFinish} layout="vertical">
//           <Form.Item
//             label="Username"
//             name="username"
//             rules={[{ required: true, message: "Please enter a username!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please enter a password!" }]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <div style={{ marginBottom: 16, textAlign: "right" }}>
//             <Link to="/forget">Forgot password?</Link>
//           </div>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading} block>
//               Login
//             </Button>
//           </Form.Item>
//           <Form.Item>
//             <Button type="default" block onClick={() => navigate("/register")}>
//               Register
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default LoginForm;
