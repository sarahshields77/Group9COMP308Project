// client/auth-app/src/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// GraphQL Mutations
const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!, $role: String!) {
    register(username: $username, password: $password, role: $role)
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Resident");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [register] = useMutation(REGISTER_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      setLoggedInUser(token.split("=")[1]);
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const event = new CustomEvent('redirect', { detail: { path: '/community' } });
      window.dispatchEvent(event);
    }
  }, [loggedInUser])

  const handleRegister = async () => {
    await register({ variables: { username, password, role } });
    alert("Registered! Now log in.");
  };

  const handleLogin = async () => {
    const { data } = await login({ variables: { username, password } });
    document.cookie = `token=${data.login}; path=/`;
    setLoggedInUser(data.login);
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedInUser(null);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Register</h2>
            <input className="form-control mb-2" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <select className="form-select mb-3" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Resident">Resident</option>
              <option value="BusinessOwner">Business Owner</option>
              <option value="CommunityOrganizer">Community Organizer</option>
            </select>
            <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
          </div>

          <div className="card p-4 shadow mt-4">
            <h2 className="text-center mb-4">Login</h2>
            <button className="btn btn-success w-100" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
