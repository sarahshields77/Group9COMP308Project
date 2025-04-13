// client/community-app/src/hooks/useUserRole.jsx
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      try {
        const decoded = jwtDecode(token.split("=")[1]);
        console.log("🔐 Decoded user:", decoded); // shows id, username, role
        setUser(decoded);
      } catch (err) {
        console.warn("❌ Token decode failed:", err);
        setUser(null);
      }
    } else {
      console.warn("⚠️ No token found.");
    }
  }, []);

  return user; // { id, username, role }
}
