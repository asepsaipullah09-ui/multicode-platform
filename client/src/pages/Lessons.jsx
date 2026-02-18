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
    <div style={{ padding: "40px" }}>
      <h1>Daftar Materi</h1>

      {lessons.map((lesson) => (
        <div
          key={lesson._id}
          style={{
            marginBottom: "20px",
            cursor: "pointer",
            border: "1px solid gray",
            padding: "10px",
          }}
          onClick={() => navigate(`/lesson/${lesson._id}`)}
        >
          <h3>{lesson.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default Lessons;
