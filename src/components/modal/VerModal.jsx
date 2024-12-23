import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
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
  const [loading, setLoading] = useState(false); // Estado de carga
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Solución: Limpia el estado al cerrar el modal
  useEffect(() => {
    if (!open) {
      setCharacterDetails(null);
      setEpisodeDetails([]);
      setPage(0); // Reinicia la paginación
    }
  }, [open]);

  useEffect(() => {
    if (character && open) {
      setLoading(true);
      fetch(`https://rickandmortyapi.com/api/character/${character.id}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacterDetails(data);
          const episodePromises = data.episode.map((episodeUrl) =>
            fetch(episodeUrl).then((response) => response.json())
          );
          Promise.all(episodePromises).then((episodes) => {
            setEpisodeDetails(episodes);
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error("Error al obtener detalles del personaje:", error);
          setLoading(false);
        });
    }
  }, [character, open]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Cargando datos...</Typography>
          </Box>
        ) : characterDetails ? (
          <>
            <Box sx={{ display: "flex", gap: 4, mb: 4, alignItems: "center" }}>
              <img
                src={characterDetails.image}
                alt={characterDetails.name}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid rgb(77, 122, 84)",
                }}
              />
              <Box>
                <Typography color="textPrimary">
                  <Typography variant="h3">{characterDetails.name}</Typography>
                  <Typography variant="body2">
                    <strong>Estado:</strong> {characterDetails.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Especie:</strong> {characterDetails.species}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Origen:</strong> {characterDetails.origin.name}
                  </Typography>
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
              Episodios
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#a3bfa8" }}>
                  <TableRow>
                    <TableCell sx={{ fontSize: "16px" }}>
                      <strong>N°</strong>
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }}>
                      <strong>Nombre Episodio</strong>
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }}>
                      <strong>Fecha de lanzamiento</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#d4e2d0" }}>
                  {episodeDetails
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((episode, index) => (
                      <TableRow key={episode.id}>
                        <TableCell sx={{ fontSize: "16px" }}>
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "16px" }}>
                          {" "}
                          {episode.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: "16px" }}>
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
          <Typography>No se encontraron detalles.</Typography>
        )}
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            transition: "all 0.3s",
            "&:hover": { backgroundColor: "primary.light", color: "#fff" },
            mt: 3,
          }}
          color="primary"
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default VerModal;
