import React from "react";
import "./App.css";

function Footer() {
  return (
    <footer className="text-center py-4 mt-auto border-top small">
      <p className="mb-0">© {new Date().getFullYear()} Group 9 – COMP308. All rights reserved.</p>
      <p className="mb-0">Built with ❤️ for local communities.</p>
    </footer>
  );
}

export default Footer;
