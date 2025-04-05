// client/shell-app/src/hooks/useUserRole.jsx
import { useEffect, useState } from "react";
import  { jwtDecode } from "jwt-decode";

export default function useUserRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
      const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      try {
        const decoded = jwtDecode(token.split("=")[1]);
        console.log("🔐 Decoded token:", decoded);
        setRole(decoded.role);
        console.log("👤 Logged-in role:", decoded.role);
      } catch (err) {
        console.warn("❌ Token decode failed:", err);
        setRole(null);
      }
    } else {
      console.warn("⚠️ No token found.");
    }
  }, []);

  return role;
}
