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
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <h2 className="text-xl font-semibold mb-6">
        Daftar Bahasa Pemrograman
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {languages.map((lang) => (
          <div
            key={lang._id}
            onClick={() => navigate(`/lessons/${lang._id}`)}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <h3 className="text-lg font-bold mb-2">{lang.name}</h3>
            <p className="text-gray-600">{lang.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
