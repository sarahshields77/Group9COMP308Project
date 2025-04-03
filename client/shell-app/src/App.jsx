// client/shell-app/src/App.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Header from "./Header";
import Footer from "./Footer";

const AuthApp = lazy(() => import("authApp/App"));
const CommunityApp = lazy(() => import("communityApp/App"));
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

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
    <div className="container mt-3">
      <Header />
      <h1 className="text-center">🏡 Community Engagement Platform</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/*" element={<AuthApp />} />
          <Route path="/community/*" element={<CommunityApp />} />
          <Route path="*" element={<h3 className="text-center">Welcome! Please explore our Community Services.</h3>} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
