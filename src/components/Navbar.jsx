// src/components/Navbar.jsx
import React from "react";
import { Layout, Button, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = ({ isLoggedIn, user, onLogout, onNavigate }) => {
  const menu = (
    <Menu
      onClick={(e) => {
        if (e.key === "logout") {
          onLogout();
        } else if (user && user.role === 'admin') {
          onNavigate("admin");
        } else {
          onNavigate("user");
        }
      }}
      items={[
        { key: "info", label: "Info" },
        { key: "setting", label: "Settings" },
        { key: "logout", label: "Log out" }
      ]}
    />
  );

  return (
    <Header className="site-header" style={{ alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 22, cursor: "pointer" }} onClick={() => onNavigate("home")}>
          Home
        </div>
      </div>

      <div className="header-right" style={{ display: "flex", alignItems: "center" }}>
        {!isLoggedIn ? (
          <Button type="link" onClick={() => onNavigate("login")} style={{ color: "#fff" }}>
            Login
          </Button>
        ) : (
          <Dropdown overlay={menu} placement="bottomRight">
            <Avatar size="large" icon={<UserOutlined />} style={{ cursor: "pointer" }} />
          </Dropdown>
        )}
      </div>
    </Header>
  );
};

export default Navbar;

// import React from "react";
// import { Layout, Menu, Dropdown, Avatar } from "antd";
// import { Link, useNavigate } from "react-router-dom";

// const { Header } = Layout;

// const Navbar = () => {
//     const navigate = useNavigate();
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//     const handleLogout = () => {
//         localStorage.removeItem("currentUser");
//         navigate("/");
//     };

//     const menu = (
//         <Menu>
//             <Menu.Item key="info">Information</Menu.Item>
//             <Menu.Item key="setting">Settings</Menu.Item>
//             <Menu.Item key="logout" onClick={handleLogout}>
//                 Logout
//             </Menu.Item>
//         </Menu>
//     );

//     return (
//         <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <Link to="/" style={{ color: "#fff", fontSize: "16px" }}>
//                 Home
//             </Link>
//             {currentUser ? (
//                 <Dropdown overlay={menu} placement="bottomRight">
//                     <Avatar style={{ backgroundColor: "#14d198ff" }}>
//                         {currentUser.username[0].toUpperCase()}
//                     </Avatar>
//                 </Dropdown>
//             ) : (
//                 <Link to="/login" style={{ color: "#fff" }}>
//                     Login
//                 </Link>
//             )}
//         </Header>
//     );
// };

// export default Navbar;
