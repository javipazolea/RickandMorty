import React, { useEffect, useState } from "react";
import CharacterInputBox from "../components/CharacterSearchModule/CharacterInputBox";
import CharacterPagination from "../components/CharacterSearchModule/CharacterPagination";
import CharacterCardList from "../components/CharacterSearchModule/CharacterCardList";
import { Box, Container } from "@mui/material";

function SearchCharacterPage() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");

  const fetchCharacters = async (name, page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`
      );
      const data = await response.json();
      setCharacters(data.results || []);
      setTotalPages(data.info?.pages || 1);
      setError("");
    } catch (error) {
      setError("Error al obtener los personajes. Intenta nuevamente.");
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(searchName, page);
  }, [page, searchName]);

  return (
    <Container>
      <Box>
        <CharacterInputBox
          onSearch={(name) => {
            setSearchName(name);
            setPage(1);
          }}
        />
      </Box>
      <Box>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && characters.length === 0 && (
          <p>No se encontraron personajes con ese nombre.</p>
        )}
        {!loading && characters.length > 0 && (
          <CharacterCardList characters={characters} />
        )}
      </Box>
      <Box>
        <CharacterPagination
          page={page}
          totalPages={totalPages}
          onNext={() => setPage(page + 1)}
          onPrev={() => setPage(page - 1)}
        />
      </Box>
    </Container>
  );
}

export default SearchCharacterPage;
