import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

const VerModal = ({ open, handleClose, character }) => {
  const [characterDetails, setCharacterDetails] = useState(null);
  const [episodeDetails, setEpisodeDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Máximo de registros por página

  useEffect(() => {
    if (character && open) {
      // Obtener detalles del personaje
      fetch(`https://rickandmortyapi.com/api/character/${character.id}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacterDetails(data);

          // Obtener detalles de los episodios
          const episodePromises = data.episode.map((episodeUrl) =>
            fetch(episodeUrl).then((response) => response.json())
          );

          Promise.all(episodePromises).then((episodes) => {
            setEpisodeDetails(episodes);
          });
        })
        .catch((error) => {
          console.error("Error al obtener detalles del personaje:", error);
        });
    }
  }, [character, open]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reinicia a la primera página
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "white",
          boxShadow: 24,

          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Contenido del modal */}
        {characterDetails ? (
          <>
            <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
              <img
                src={characterDetails.image}
                alt={characterDetails.name}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "10%",
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography variant="h5" gutterBottom>
                  {characterDetails.name}
                </Typography>
                <Typography variant="body2">
                  <strong>ID:</strong> {characterDetails.id}
                </Typography>
                <Typography variant="body2">
                  <strong>Estado:</strong> {characterDetails.status}
                </Typography>
                <Typography variant="body2">
                  <strong>Especie:</strong> {characterDetails.species}
                </Typography>
                <Typography variant="body2">
                  <strong>Tipo:</strong>{" "}
                  {characterDetails.type || "No especificado"}
                </Typography>
                <Typography variant="body2">
                  <strong>Género:</strong> {characterDetails.gender}
                </Typography>
                <Typography variant="body2">
                  <strong>Origen:</strong> {characterDetails.origin.name}
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
              Episodios en los que aparece:
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="episodios">
                <TableHead>
                  <TableRow>
                    <TableCell bgcolor="#d1d1d1">
                      <strong>Número Episodio</strong>
                    </TableCell>
                    <TableCell bgcolor="#d1d1d1">
                      <strong>Nombre Episodio</strong>
                    </TableCell>
                    <TableCell bgcolor="#d1d1d1">
                      <strong>Fecha de Lanzamiento</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {episodeDetails
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((episode, index) => (
                      <TableRow key={episode.id}>
                        <TableCell bgcolor="#e0e0e0">
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell bgcolor="#e0e0e0">{episode.name}</TableCell>
                        <TableCell bgcolor="#e0e0e0">
                          {episode.air_date}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={episodeDetails.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography variant="body2">Cargando detalles...</Typography>
        )}

        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            marginTop: 2,
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default VerModal;
