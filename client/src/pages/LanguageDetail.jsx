import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

function LanguageDetail() {
  const { id } = useParams();
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const res = await API.get(`/languages/${id}`);
        setLanguage(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10 flex items-center justify-center">
      <p className="text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  );

  if (!language) return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
      <p className="text-red-500">Language not found</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10"
    >
      <h1 className="text-4xl font-bold mb-4 dark:text-white">
        {language.name}
      </h1>

      <p className="text-gray-600 dark:text-gray-300 text-lg">
        {language.description}
      </p>
    </motion.div>
  );
}

export default LanguageDetail;
