import React from "react";
import Login from "../components/LogIn/Login";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <Login />
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default LoginPage;
