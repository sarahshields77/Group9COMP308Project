// client/shell-app/src/contexts/RoleContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      try {
        const decoded = jwtDecode(token.split("=")[1]);
        setRole(decoded.role);
      } catch {
        setRole(null);
      }
    }
  }, []);

  return (
    <RoleContext.Provider value={role}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
