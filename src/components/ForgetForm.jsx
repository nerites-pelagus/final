// src/components/ForgetForm.jsx
import React, { useState } from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { getUsersFromStorage, saveUsersToStorage } from "../utils/auth";

const ForgetForm = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    const users = getUsersFromStorage();
    const idx = users.findIndex(u => u.username === values.username && u.email === values.email);
    setTimeout(() => {
      if (idx !== -1) {
        users[idx].password = "123456";
        saveUsersToStorage(users);
        notification.success({
          message: "Password Reset Successful",
          description: "Your password has been reset to '123456'. Please log in again."
        });
        onNavigate("login");
      } else {
        notification.error({
          message: "Account not found",
          description: "Username or email does not match."
        });
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Card title="Forgot Password" style={{ width: 420 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>Confirm</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetForm;

// import React, { useState } from "react";
// import { Form, Input, Button, Card, notification } from "antd";

// const ForgetForm = () => {
//   const [loading, setLoading] = useState(false);

//   const onFinish = (values) => {
//     setLoading(true);
//     const { username, email } = values;

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const idx = users.findIndex(
//       (u) => u.username === username && u.email === email
//     );

//     if (idx !== -1) {
//       users[idx].password = "123456";
//       localStorage.setItem("users", JSON.stringify(users));
//       alert("Password reset successful. New password: 123456");
//     } else {
//       alert("Account not found. Incorrect username or email!");
//     }

//     setTimeout(() => {
//       notification.info({
//         key: "forget-info",
//         message: "Request processed",
//         description: "Your password reset request has been handled.",
//       });
//     }, 500);

//     setLoading(false);
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
//       <Card title="Forgot Password" style={{ width: 400 }}>
//         <Form name="forget" onFinish={onFinish} layout="vertical">
//           <Form.Item
//             label="Username"
//             name="username"
//             rules={[{ required: true, message: "Please enter a username!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Please enter an email!" },
//               { type: "email", message: "Invalid email!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading} block>
//               Confirm
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default ForgetForm;
