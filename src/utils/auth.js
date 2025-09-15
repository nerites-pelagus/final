// src/utils/auth.js

const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";

export function getUsersFromStorage() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveUsersToStorage(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function ensureAdminExists() {
  const users = getUsersFromStorage();
  const hasAdmin = users.some(u => u.role === "admin" && u.username === "admin");
  if (!hasAdmin) {
    users.push({
      username: "admin",
      password: "admin123",
      email: "admin@system.com",
      phonenumber: "0000000000",
      role: "admin"
    });
    saveUsersToStorage(users);
  }
}

export function findUser(username) {
  const users = getUsersFromStorage();
  return users.find(u => u.username === username);
}

export function addUser(user) {
  const users = getUsersFromStorage();
  users.push(user);
  saveUsersToStorage(users);
}

export function updateUser(username, newData) {
  const users = getUsersFromStorage();
  const idx = users.findIndex(u => u.username === username);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...newData };
    saveUsersToStorage(users);
    // update currentUser if same
    const current = getCurrentUserFromStorage();
    if (current && current.username === username) {
      setCurrentUserToStorage(users[idx]);
    }
    return true;
  }
  return false;
}

export function deleteUser(username) {
  let users = getUsersFromStorage();
  users = users.filter(u => u.username !== username);
  saveUsersToStorage(users);
  const cur = getCurrentUserFromStorage();
  if (cur && cur.username === username) {
    localStorage.removeItem(CURRENT_KEY);
  }
}

export function resetPassword(username, newPassword = "123456") {
  const users = getUsersFromStorage();
  const idx = users.findIndex(u => u.username === username);
  if (idx !== -1) {
    users[idx].password = newPassword;
    saveUsersToStorage(users);
    // update current user if same
    const cur = getCurrentUserFromStorage();
    if (cur && cur.username === username) setCurrentUserToStorage(users[idx]);
    return true;
  }
  return false;
}

export function setCurrentUserToStorage(user) {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
}

export function getCurrentUserFromStorage() {
  const raw = localStorage.getItem(CURRENT_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem(CURRENT_KEY);
}
