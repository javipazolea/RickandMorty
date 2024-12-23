import React from "react";
import SearchCharacterPage from "./SearchCharacterPage";

function Home() {
  return (
    <div className="home">
      <div>BÚSQUEDA DE PERSONAJES </div>
      <div>
        <SearchCharacterPage />
      </div>
    </div>
  );
}

export default Home;
