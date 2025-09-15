import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgetForm from "./components/ForgetForm";
import UserPage from "./components/UserPage";
import AdminPage from "./components/AdminPage";
import { ensureAdminExists, getCurrentUserFromStorage } from "./utils/auth";

const { Content } = Layout;

function App() {
  const [route, setRoute] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    ensureAdminExists();
    
    const cur = getCurrentUserFromStorage();
    if (cur) {
      setCurrentUser(cur);
      setRoute(cur.role === "admin" ? "admin" : "user");
    } else {
      setRoute("home");
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setRoute(user.role === "admin" ? "admin" : "user");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setRoute("home");
  };

  const handleRoute = (r) => setRoute(r);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar
        isLoggedIn={!!currentUser}
        user={currentUser}
        onLogout={handleLogout}
        onNavigate={handleRoute}
      />

      <Content style={{ padding: "24px" }}>
        {route === "home" && <Home />}
        {route === "login" && <LoginForm onLogin={handleLogin} onNavigate={handleRoute} />}
        {route === "register" && <RegisterForm onNavigate={handleRoute} />}
        {route === "forget" && <ForgetForm onNavigate={handleRoute} />}
        {route === "user" && currentUser && (
          <UserPage onLogout={handleLogout} setRoute={setRoute} />
        )}
        {route === "admin" && currentUser && <AdminPage setRoute={setRoute} />}
      </Content>
    </Layout>
  );
}

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

