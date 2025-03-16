// client/shell-app/src/App.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ No need for BrowserRouter here!
import "./App.css";

// Lazy load `authApp` from the remote microfrontend
const AuthApp = lazy(() => import("authApp/App"));

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">🏡 Community Engagement Platform</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/*" element={<AuthApp />} />
          <Route path="*" element={<h3 className="text-center">Welcome! Please explore our Community Services.</h3>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
