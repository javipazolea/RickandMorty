import React, { useState, useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../../LogIn/UserContext"; // Importa el contexto
import { Link } from "react-router-dom";

const DrawerExample = () => {
  const [open, setOpen] = useState(false);
  // Extraemos `user` y `handleLogout` desde el contexto
  const { user, handleLogout } = useContext(UserContext);

  return (
    <>
      {/* IconButton con el ícono de hamburguesa */}
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => setOpen(true)}
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer que se activa/desactiva */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          {user ? (
            // Si el usuario está autenticado, muestra la opción de cerrar sesión
            <ListItem button="true" onClick={handleLogout}>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
          ) : (
            // Si no hay usuario, muestra la opción para iniciar sesión
            <ListItem button="true" component={Link} to="/login">
              <ListItemText primary="Iniciar Sesión" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default DrawerExample;
