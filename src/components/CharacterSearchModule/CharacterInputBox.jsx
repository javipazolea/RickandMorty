import React from "react";

function CharacterInputBox({ onSearch }) {
  const searchInput = React.useRef();
  //Handlers de busqueda
  // Handler para buscar personajes
  const handleSearch = () => {
    onSearch(searchInput.current.value);
  };

  // Handler para busqueda a través del Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {" "}
      <input
        type="text"
        placeholder="Ingresa Personaje"
        ref={searchInput}
        onKeyDown={handleKeyPress}
      />
      {/* Botón de búsqueda */}
      <button onClick={handleSearch}>BUSCAR</button>
    </div>
  );
}

export default CharacterInputBox;
