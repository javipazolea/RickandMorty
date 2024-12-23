import React, { useState, useContext, useRef } from "react";
import { Button } from "@mui/material";
import { CharacterContext } from "./CharacterContext";

function CharacterInputBox() {
  const { setSearchName, setPage, setAliveFilter } =
    useContext(CharacterContext);
  const searchInput = useRef();
  const [isAliveChecked, setIsAliveChecked] = useState(false); // Estado para el checkbox

  // Handler para buscar personajes
  const handleSearch = () => {
    const name = searchInput.current.value;
    setSearchName(name); // Actualizar nombre de búsqueda en el contexto
    setAliveFilter(isAliveChecked); // Actualizar el filtro de "Alive" en el contexto
    setPage(1); // Reiniciar la paginación
    console.log("Buscando personajes...", { name, isAliveChecked });
  };

  // Handler para búsqueda a través del Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handler para el checkbox
  const handleCheckboxChange = (e) => {
    setIsAliveChecked(e.target.checked); // Actualizar estado del checkbox localmente
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingresa Personaje"
        ref={searchInput}
        onKeyDown={handleKeyPress}
      />
      {/* Botón de búsqueda */}
      <Button
        onClick={handleSearch}
        variant="contained"
        color="secondary"
        sx={{ marginLeft: 1 }}
      >
        BUSCAR
      </Button>

      {/* Checkbox para filtrar por estado "alive" */}
      <label>
        <input
          type="checkbox"
          checked={isAliveChecked}
          onChange={handleCheckboxChange}
        />
        Filtrar por "Alive"
      </label>
    </div>
  );
}

export default CharacterInputBox;
