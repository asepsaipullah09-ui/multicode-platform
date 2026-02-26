import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [languages, setLanguages] = useState([]);
  const [user, setUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLanguage, setNewLanguage] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await API.get("/languages");
        setLanguages(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchLanguages();
  }, []);

  const handleAddLanguage = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/languages", newLanguage);
      setLanguages([...languages, res.data]);
      setShowAddForm(false);
      setNewLanguage({ name: "", description: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Error adding language");
    }
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {isAdmin && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Tambah Language
          </button>
        )}
      </div>

      <p className="text-gray-600 mb-4">
        Logged in as: <strong>{user?.name}</strong> ({user?.role})
      </p>

      <h2 className="text-xl font-semibold mb-6">
        Daftar Bahasa Pemrograman
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {lang.name}
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              {lang.description}
            </p>

            <button 
              onClick={() => navigate(`/lessons/${lang.id}`)}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Lihat Materi
            </button>
          </div>
        ))}
      </div>

      {/* Add Language Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Tambah Language</h3>
            <form onSubmit={handleAddLanguage}>
              <input
                type="text"
                placeholder="Nama Language"
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={newLanguage.description}
                onChange={(e) => setNewLanguage({ ...newLanguage, description: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Tambah
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
