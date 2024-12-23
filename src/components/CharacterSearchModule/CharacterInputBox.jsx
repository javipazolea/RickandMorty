import React, { useState } from "react";

function CharacterInputBox({ onSearch }) {
  const searchInput = React.useRef();
  const [isAliveChecked, setIsAliveChecked] = useState(false); // Estado para el checkbox

  // Handler para buscar personajes
  const handleSearch = () => {
    const searchQuery = searchInput.current.value;
    const aliveFilter = isAliveChecked ? "alive" : ""; // Filtro por estado
    onSearch(`${searchQuery}${aliveFilter ? `&status=${aliveFilter}` : ""}`);
  };

  // Handler para búsqueda a través del Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handler para el checkbox
  const handleCheckboxChange = (e) => {
    setIsAliveChecked(e.target.checked); // Actualizar estado del checkbox
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
      <button onClick={handleSearch}>BUSCAR</button>

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
