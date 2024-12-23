import React, { useContext } from "react";
import { Button } from "@mui/material";
import { CharacterContext } from "./CharacterContext";

function CharacterPagination() {
  const { page, totalPages, setPage } = useContext(CharacterContext);

  //handle para la paginacion de personajes

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
    console.log("Siguiente página", page);
  };
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
    console.log("Página anterior", page);
  };

  return (
    <div>
      {/* Controles de paginación */}
      <div className="pagination">
        <Button
          disabled={page === 1}
          onClick={handlePreviousPage}
          variant="contained"
          color="secondary"
          sx={{ marginRight: 2 }}
        >
          Anterior
        </Button>
        <span>
          Página {page} de {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={handleNextPage}
          variant="contained"
          color="secondary"
          sx={{ marginLeft: 2 }}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default CharacterPagination;
