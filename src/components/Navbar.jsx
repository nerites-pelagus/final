import React from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/");
    };

    const menu = (
        <Menu>
            <Menu.Item key="info">Information</Menu.Item>
            <Menu.Item key="setting">Settings</Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link to="/" style={{ color: "#fff", fontSize: "16px" }}>
                Home
            </Link>
            {currentUser ? (
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar style={{ backgroundColor: "#14d198ff" }}>
                        {currentUser.username[0].toUpperCase()}
                    </Avatar>
                </Dropdown>
            ) : (
                <Link to="/login" style={{ color: "#fff" }}>
                    Login
                </Link>
            )}
        </Header>
    );
};

export default Navbar;
