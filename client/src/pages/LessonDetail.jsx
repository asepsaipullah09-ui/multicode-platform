import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

  const renderContent = (content) => {
    if (!content) return null;

    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        const textPart = content.slice(lastIndex, match.index);
        parts.push(
          <p
            key={`text-${lastIndex}`}
            className="mb-4 whitespace-pre-wrap"
          >
            {textPart}
          </p>
        );
      }

      const language = match[1] || "plaintext";
      const code = match[2].trim();

      parts.push(
        <div key={`code-${match.index}`} className="mb-4 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: "20px",
              fontSize: "14px",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      const textPart = content.slice(lastIndex);
      parts.push(
        <p
          key={`text-${lastIndex}`}
          className="mb-4 whitespace-pre-wrap"
        >
          {textPart}
        </p>
      );
    }

    return parts;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          {lesson.title}
        </h1>
        <div className="text-gray-700 leading-relaxed">
          {renderContent(lesson.content)}
        </div>
      </div>
    </div>
  );
}

export default LessonDetail;