import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "" || confirmPassword === "") {
      setError("Todos los campos son obligatorios");
    } else if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
    } else {
      setError(null);
      //logica backend
      enqueueSnackbar("¡Registro exitoso! Ahora puedes iniciar sesión.", {
        variant: "success",
      });
      console.log("Usuario Registrado", { username, password });
      navigate("/login");

      // Limpia los campos
      setUsername("");
      setPassword("");
    }
  };
  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <h1>Crear Nuevo Usuario</h1>
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
        <TextField
          label="Confirmar Contraseña"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          required
          margin="normal"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" variant="contained" fullWidth color="primary">
          Registrarse
        </Button>
      </form>
    </Box>
  );
};
export default Register;
