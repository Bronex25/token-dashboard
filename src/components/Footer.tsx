import React from "react";

export const Footer: React.FC = () => (
  <footer className="w-full py-4 px-6 text-center text-sm text-gray-500 border-t">
    © {new Date().getFullYear()} Token Dashboard. Built by Oleksandr.
  </footer>
);
