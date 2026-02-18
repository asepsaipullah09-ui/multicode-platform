import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/lessons/${id}`
        );
        setLesson(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLesson();
  }, [id]);

  if (!lesson) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{lesson.title}</h1>
      <p>{lesson.content}</p>
    </div>
  );
}

export default LessonDetail;
