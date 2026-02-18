import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/languages");
        setLanguages(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <h2>Daftar Bahasa Pemrograman</h2>

      {languages.map((lang) => (
        <div
          key={lang._id}
          style={{
            marginBottom: "20px",
            cursor: "pointer",
            border: "1px solid gray",
            padding: "10px",
          }}
          onClick={() => navigate(`/lessons/${lang._id}`)}
        >
          <h3>{lang.name}</h3>
          <p>{lang.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
