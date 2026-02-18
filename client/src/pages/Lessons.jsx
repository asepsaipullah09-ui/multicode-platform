import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Lessons() {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/lessons/language/${languageId}`
        );
        setLessons(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();
  }, [languageId]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">Daftar Materi</h1>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            onClick={() => navigate(`/lesson/${lesson._id}`)}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold">{lesson.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
