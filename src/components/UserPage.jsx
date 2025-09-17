// src/components/UserPage.jsx
import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Modal } from "antd";
import { getCurrentUserFromStorage, getUsersFromStorage, saveUsersToStorage, deleteUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const UserPage = ({ onLogout }) => {
  const [user, setUser] = useState(getCurrentUserFromStorage());
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) form.setFieldsValue(user);
  }, [user, form]);

  const onFinish = (values) => {
    setLoading(true);
    const users = getUsersFromStorage();
    const idx = users.findIndex(u => u.username === user.username);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...values };
      saveUsersToStorage(users);
      localStorage.setItem("currentUser", JSON.stringify(users[idx]));
      setUser(users[idx]);
      alert("Update successful!");
    } else {
      alert("User not found!");
    }
    setLoading(false);
  };

  const showChangePasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const handlePasswordChange = async () => {
    try {
      const values = await passwordForm.validateFields();
      if (values.oldPassword !== user.password) {
        alert("Incorrect old password!");
        return;
      }

      const users = getUsersFromStorage();
      const idx = users.findIndex(u => u.username === user.username);
      if (idx !== -1) {
        users[idx].password = values.newPassword;
        saveUsersToStorage(users);
        localStorage.setItem("currentUser", JSON.stringify(users[idx]));
        setUser(users[idx]);
        alert("Password changed successfully!");
        setIsPasswordModalVisible(false);
        passwordForm.resetFields();
      } else {
        alert("User not found!");
      }
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo);
    }
  };

  const handleCancelPasswordChange = () => {
    setIsPasswordModalVisible(false);
    passwordForm.resetFields();
  };
  
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      deleteUser(user.username);
      alert("Delete account successful!");
      onLogout();
      navigate("/home");
    }
  };

  if (!user) {
    return <div>Login please</div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "24px auto" }}>
      <Card title={`Profile — ${user.username}`}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" label="Username" rules={[{required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phonenumber" label="Phone">
            <Input />
          </Form.Item>
          {/* <Form.Item name="password" label="Password (curent)">
            <Input.Password placeholder="No need to input if not changed!" />
          </Form.Item> */}

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
              <Button onClick={showChangePasswordModal}>Change password</Button>
              <Button danger onClick={handleDeleteAccount}>Delete account</Button>
            </div>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title="Change Password"
        open={isPasswordModalVisible}
        onOk={handlePasswordChange}
        onCancel={handleCancelPasswordChange}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={passwordForm} layout="vertical" name="passwordChangeForm">
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[{ required: true, message: 'Please input your old password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPage;

// import React, { useState } from "react";
// import { Form, Input, Button, Card, message } from "antd";

// const UserPage = () => {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const [form] = Form.useForm();
//   const [user, setUser] = useState(currentUser);

//   const onFinish = (values) => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const idx = users.findIndex((u) => u.username === user.username);
//     if (idx !== -1) {
//       users[idx] = { ...users[idx], ...values };
//       localStorage.setItem("users", JSON.stringify(users));
//       localStorage.setItem("currentUser", JSON.stringify(users[idx]));
//       setUser(users[idx]);
//       message.success("Update successful!");
//     }
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
//       <Card title="Personal Information" style={{ width: 400 }}>
//         <Form form={form} initialValues={user} onFinish={onFinish} layout="vertical">
//           <Form.Item label="Email" name="email">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Phone Number" name="phonenumber">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Password" name="password">
//             <Input.Password />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Save Changes
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default UserPage;
