import React, { useState } from "react";
import { Table, Button, Popconfirm, message, Card } from "antd";

const AdminPage = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);

  const deleteUser = (username) => {
    const newUsers = users.filter((u) => u.username !== username);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    message.success("Deleted account successfully!");
  };

  const resetPassword = (username) => {
    const newUsers = users.map((u) =>
      u.username === username ? { ...u, password: "123456" } : u
    );
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    message.success("Password reset successfully (123456)!");
  };

  const columns = [
    { title: "Username", dataIndex: "username" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phonenumber" },
    { title: "Role", dataIndex: "role" },
    { title: "Password", dataIndex: "password" },
    {
      title: "Actions",
      render: (_, record) =>
        record.role !== "admin" && (
          <>
            <Popconfirm
              title="Delete this account?"
              onConfirm={() => deleteUser(record.username)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button
              type="link"
              onClick={() => resetPassword(record.username)}
              style={{ marginLeft: 8 }}
            >
              Reset Password
            </Button>
          </>
        ),
    },
  ];

  return (
    <div style={{ margin: 50 }}>
      <Card title="User Management">
        <Table rowKey="username" dataSource={users} columns={columns} />
      </Card>
    </div>
  );
};

export default AdminPage;
