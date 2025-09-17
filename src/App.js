import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgetForm from "./components/ForgetForm";
import UserPage from "./components/UserPage";
import AdminPage from "./components/AdminPage";
import { getCurrentUserFromStorage } from "./utils/auth";

const { Content } = Layout;

const App = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUserFromStorage());

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar user={currentUser} onLogout={handleLogout} />
        <Content style={{ padding: "24px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/login"
              element={
                currentUser ? (
                  <Navigate to={currentUser.role === "admin" ? "/admin" : "/user"} />
                ) : (
                  <LoginForm onLogin={handleLogin} />
                )
              }
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forget" element={<ForgetForm />} />
            <Route path="/user" element={currentUser?.role === "user" ? <UserPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={currentUser?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/forget" element={<ForgetForm />} />
//         <Route path="/user" element={<UserPage />} />
//         <Route path="/admin" element={<AdminPage />} />
//       </Routes>
//     </Router>
//   );
// };
