// client/shell-app/src/App.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Header from "./Header";
import Footer from "./Footer";
import useUserRole from "./hooks/useUserRole.jsx";

const AuthApp = lazy(() => import("authApp/App"));
const CommunityApp = lazy(() => import("communityApp/App"));
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const role = useUserRole(); // Custom hook to get logged-in user role

  useEffect(() => {
    if (role) {
      console.log(`🔐 Logged in as: ${role}`);
    }
  }, [role]);

  useEffect(() => {
    const handleRedirect = (event) => {
      console.log(event.detail)
      navigate(event.detail.path);
    };
    // alert("app.jsx useEffect")
    window.addEventListener('redirect', handleRedirect);

    return () => {
      window.removeEventListener('redirect', handleRedirect);
    };
  }, [navigate]);

  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <h1 className="text-center">🏡 Community Engagement Platform</h1>
        <div className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/auth/*" element={<AuthApp />} />
              <Route path="/community/*" element={<CommunityApp />} />
              <Route path="*" element={<h3 className="text-center">Welcome! Please explore our Community Services.</h3>} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
