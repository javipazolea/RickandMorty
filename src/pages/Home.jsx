import React, { useContext } from "react";
import { UserContext } from "../components/LogIn/UserContext";
import { useNavigate } from "react-router-dom";
import SearchCharacterPage from "./SearchCharacterPage";

const Home = () => {
  const { handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login"); // Redirigir al login después de cerrar sesión
  };
  return (
    <div>
      <h1>Bienvenido a la Página Principal</h1>
      <SearchCharacterPage />
    </div>
  );
};

export default Home;
