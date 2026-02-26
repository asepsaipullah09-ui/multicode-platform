import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

function Dashboard() {
  const [languages, setLanguages] = useState([]);
  const [user, setUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLanguage, setNewLanguage] = useState({ name: "", description: "" });
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10 transition-colors duration-300"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        
        <div className="flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 dark:text-white transition"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
          
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              + Tambah Language
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Logged in as: <strong>{user?.name}</strong> ({user?.role})
      </p>

      <h2 className="text-xl font-semibold mb-6 dark:text-white">
        Daftar Bahasa Pemrograman
      </h2>

      <motion.div
        className="grid md:grid-cols-3 sm:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {languages.map((lang) => (
          <motion.div
            key={lang.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {lang.name}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {lang.description}
            </p>

            <button 
              onClick={() => navigate(`/lessons/${lang.id}`)}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Lihat Materi
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Add Language Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Tambah Language</h3>
            <form onSubmit={handleAddLanguage}>
              <input
                type="text"
                placeholder="Nama Language"
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              <textarea
                placeholder="Description"
                value={newLanguage.description}
                onChange={(e) => setNewLanguage({ ...newLanguage, description: e.target.value })}
                className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
    </motion.div>
  );
}

export default Dashboard;
