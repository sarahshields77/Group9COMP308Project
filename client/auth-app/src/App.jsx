import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
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

// Components for Routing
const Home = () => (
  <div className="container text-center mt-5">
    <h1>Welcome to Our Community Platform</h1>
    <p>Connect with neighbors, join discussions, and support local businesses.</p>
    <Link to="/auth"><button className="btn btn-primary">Get Started</button></Link>
  </div>
);

const CommunityHub = () => (
  <div className="container text-center mt-5">
    <h1>Community Hub</h1>
    <p>Choose where you want to go:</p>
    <div className="d-flex justify-content-center gap-3">
      <button className="btn btn-info">View Local News</button>
      <button className="btn btn-warning">Find Local Events</button>
      <button className="btn btn-success">Support Local Businesses</button>
    </div>
    <Link to="/profile"><button className="btn btn-secondary mt-3">Go to Profile</button></Link>
  </div>
);

const Profile = () => (
  <div className="container text-center mt-5">
    <h1>Your Profile</h1>
    <p>Personalized settings and activity history will go here.</p>
    <Link to="/community"><button className="btn btn-primary">Back to Community Hub</button></Link>
  </div>
);

function Auth() {
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
      {loggedInUser ? (
        <Navigate to="/community" />
      ) : (
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
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
