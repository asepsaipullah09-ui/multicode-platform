import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Selamat datang, kamu sudah login 🎉</p>
    </div>
  );
};

export default Dashboard;
