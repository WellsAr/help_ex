import React, { useEffect, useState } from "react";
import API from "../api";
import { logout } from "../auth";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/api/projects/");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Dashboard</h1>
        <button onClick={logout} className="bg-red-600 text-white px-3 py-1">Logout</button>
      </div>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((p) => (
            <li key={p.id} className="border p-3 rounded">{p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}