import React, { useState } from "react";
import API from "../api";
import { setAccessToken, setRefreshToken } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/api/token/", { username, password });
      const { access, refresh } = res.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-3">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full p-2 border" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border" />
        <button className="bg-blue-600 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
}
