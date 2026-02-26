import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import LanguageDetail from "./pages/LanguageDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/languages/:id" element={<LanguageDetail />} />
        <Route path="/lessons/:languageId" element={<Lessons />} />
        <Route path="/lesson/:id" element={<LessonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
