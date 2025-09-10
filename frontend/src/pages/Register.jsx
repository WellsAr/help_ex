import React, { useState } from "react";
import API from "../api";
import { setAccessToken, setRefreshToken } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // create user — adjust endpoint to your API
      await API.post("/api/users/register/", { username, email, password });

      // login to get tokens
      const loginRes = await API.post("/api/token/", { username, password });
      const { access, refresh } = loginRes.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Registration failed");
    }
  };
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      {error && <p className="text-red-600">{JSON.stringify(error)}</p>}
      <form onSubmit={handleRegister} className="space-y-3">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full p-2 border" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border" />
        <button className="bg-green-600 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
}