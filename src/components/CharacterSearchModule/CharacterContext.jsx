import React, { createContext, useState, useEffect } from "react";

// Contexto
export const CharacterContext = createContext();

// Proveedor
export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [aliveFilter, setAliveFilter] = useState(false);

  // Funciones globales para hacer el fetch de los personajes
  const fetchCharacters = async (name, page) => {
    setLoading(true);

    // Construir la URL con el filtro "Alive"
    const baseUrl = `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`;
    const aliveQuery = aliveFilter ? "&status=alive" : "";
    const finalUrl = baseUrl + aliveQuery;

    try {
      const response = await fetch(finalUrl);
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
  }, [page, searchName, aliveFilter]); // Escuchar también cambios en "aliveFilter"

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        error,
        setError,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        searchName,
        setSearchName,
        aliveFilter,
        setAliveFilter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
