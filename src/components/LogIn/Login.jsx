import React, { useState, useContext } from "react";
import { Box, TextField, Button } from "@mui/material";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Por favor, complete todos los campos.");
    } else {
      setError(null);
      //simulacion de logica
      const userData = { username, password };
      // Llamamos a handleLogin que actualiza el contexto y guarda en localStorage y sessionStorage
      handleLogin(userData);
      //redireccionar a la pagina principal
      navigate("/");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de Usuario"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          required
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
          margin="normal"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" variant="contained" fullWidth color="primary">
          Iniciar Sesión
        </Button>
      </form>
    </Box>
  );
};

export default Login;
