import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import VerModal from "../modal/VerModal";
import { CharacterContext } from "./CharacterContext";

function CharacterCardList() {
  const { characters } = useContext(CharacterContext); // Obtenemos los personajes desde el contexto
  const [open, setOpen] = useState(false); // Estado para controlar el modal
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Para manejar el personaje seleccionado

  const handleOpen = (character) => {
    setSelectedCharacter(character); // Guardamos el personaje seleccionado
    setOpen(true); // Abrimos el modal
  };

  const handleClose = () => {
    setSelectedCharacter(null); // Limpiamos el personaje seleccionado
    setOpen(false); // Cerramos el modal
  };

  return (
    <div>
      {/* Mostrar los personajes */}
      <Grid container spacing={2} justifyContent="center">
        {characters.map((character) => (
          <Grid item xs={12} sm={6} md={3} key={character.id}>
            <Card
              sx={{
                maxWidth: 345,
                transition: "transform 0.3s, box-shadow 0.3s",
                marginTop: 2,
                "&:hover": {
                  transform: "scale(1.05)", // Aumenta ligeramente el tamaño
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Agrega sombra al hacer hover
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={character.image}
                alt={character.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Especie:</strong> {character.species}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Estado:</strong> {character.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Género:</strong> {character.gender}
                </Typography>
              </CardContent>
              <CardActions>
                {/* Botón para abrir el modal */}
                <Button
                  size="small"
                  onClick={() => handleOpen(character)}
                  variant="outlined"
                  color="primary"
                  sx={{
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "primary.light",
                      color: "#fff",
                    },
                    mt: 3,
                  }}
                >
                  Ver más
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal único fuera del loop */}
      {selectedCharacter && (
        <VerModal
          open={open}
          handleClose={handleClose}
          character={selectedCharacter} // Pasamos el personaje seleccionado al modal
        />
      )}
    </div>
  );
}

export default CharacterCardList;
