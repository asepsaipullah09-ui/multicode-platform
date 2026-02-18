import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Lessons() {
  const { languageId } = useParams();
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
        <div key={lesson._id} style={{ marginBottom: "20px" }}>
          <h3>{lesson.title}</h3>
          <p>{lesson.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Lessons;
