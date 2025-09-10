import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Thesis VCS — Frontend</h1>
      <nav className="space-x-4">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
}
