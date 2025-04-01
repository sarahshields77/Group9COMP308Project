import React from "react";

function Footer() {
  return (
    <footer className="text-center py-4 mt-5 border-top text-muted small">
      <p className="mb-0">© {new Date().getFullYear()} Group 9 – COMP308. All rights reserved.</p>
      <p className="mb-0">Built with ❤️ for local communities.</p>
    </footer>
  );
}

export default Footer;
