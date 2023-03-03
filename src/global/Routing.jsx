import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import BoardPage from "../pages/BoardPage";
import DetailsPage from "../pages/DetailsPage";
import { useEffect } from "react";

export default function Routing() {
  const liberacao = localStorage.getItem("autorizacao");
  const relembrar = localStorage.getItem("remember");
  const navigate = useNavigate();

  useEffect(() => {

    if (
      (liberacao === "true" && relembrar === "true") ||
      (liberacao === "true" && relembrar === "false")
    ) {
      navigate("/board");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/details/:day/:id" element={<DetailsPage />} />
    </Routes>
  );
}
