import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Popconfirm, message, Card, Form, Select } from "antd";
import { getUsersFromStorage, saveUsersToStorage, resetPassword, updateUser, addUser } from "../utils/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const { Option } = Select;

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setUsers(getUsersFromStorage());
  };

  const handleDelete = (username) => {
    const userList = getUsersFromStorage();
    const userToDelete = userList.find((u) => u.username === username);
    if (userToDelete && userToDelete.role === "admin") {
      message.error("Cannot delete an admin account.");
      return;
    }
    const newList = userList.filter((u) => u.username !== username);
    saveUsersToStorage(newList);
    message.success("Account deleted successfully");
    refresh();
  };

  const handleReset = (username) => {
    resetPassword(username, "123456");
    message.success(`Password for ${username} has been reset to 123456`);
    refresh();
  };

  const openEdit = (user) => {
    setEditing(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const saveEdit = async () => {
    try {
      const values = await form.validateFields();
      updateUser(editing.username, values);
      message.success("User updated successfully");
      setIsModalOpen(false);
      setEditing(null);
      refresh();
    } catch (e) { }
  };

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const createUser = async () => {
    try {
      const values = await form.validateFields();
      const existingUsers = getUsersFromStorage();
      if (existingUsers.find((u) => u.username === values.username)) {
        message.error("Username already exists");
        return;
      }
      const newUser = {
        username: values.username,
        password: values.password || "123456",
        email: values.email || "",
        phonenumber: values.phonenumber || "",
        role: values.role || "user",
      };
      addUser(newUser);
      message.success("User created successfully");
      setIsModalOpen(false);
      refresh();
    } catch (e) { }
  };

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phonenumber", key: "phonenumber" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Password", dataIndex: "password", key: "password",  render: (text) => <PasswordCell value={text} />,},
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => openEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.username)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger disabled={record.role === "admin"}>
              Delete
            </Button>
          </Popconfirm>
          <Button onClick={() => handleReset(record.username)}>Reset PW</Button>
        </div>
      ),
    },
  ];

  const PasswordCell = ({ value }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      {visible ? value : "******"}
      {visible ? (
        <EyeTwoTone onClick={() => setVisible(false)} />
      ) : (
        <EyeInvisibleOutlined onClick={() => setVisible(true)} />
      )}
    </span>
  );
};

  return (
    <div style={{ display: "flex", maxWidth: 1000, justifyContent: "center", margin: "20px auto" }}>
      <Card title="Admin — User Management" style={{ width: "100%" }}>
        <div style={{ marginBottom: 12 }}>
          <Button type="primary" onClick={openCreate}>
            Create new user
          </Button>
          <Button style={{ marginLeft: 8, float: "right" }} onClick={() => navigate("/home")}>
            Back to Home
          </Button>
        </div>
        <Table
          dataSource={users.map((u) => ({ ...u, key: u.username }))}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title={editing ? `Edit ${editing.username}` : "Create User"}
          open={isModalOpen}
          onOk={editing ? saveEdit : createUser}
          onCancel={() => setIsModalOpen(false)}
          okText="Save"
        >
          <Form form={form} layout="vertical">
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input disabled={!!editing} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={editing ? [] : [{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="phonenumber" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="role" label="Role" initialValue="user">
              <Select>
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default AdminPage;
