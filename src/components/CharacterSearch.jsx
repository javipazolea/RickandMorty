import React, { useState, useRef } from 'react';
import './CharacterSearch.css';

function CharacterSearch() {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState('');
    const [filterAlive, setFilterAlive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const searchInput = useRef(null);

    // Función para construir la URL y consumir la API
    const fetchCharacters = async (name, newPage) => {
        try {
            //iniciar estado de carga
            setLoading(true);

            // Verificar si el nombre está vacío
            if (!name.trim()) {
                setError('Favor ingrese un personaje a consultar.');
                setCharacters([]);
                return;
            }

            // Construir la URL base
            let url = `https://rickandmortyapi.com/api/character/?name=${name.toLowerCase()}`;

            // Si el checkbox de "alive" está marcado, agregar el filtro a la URL
            if (filterAlive) {
                url += '&status=alive';
            }

            // Realizar la solicitud a la API
            const response = await fetch(`${url}&page=${newPage}`);
            const data = await response.json();

            // Si no se encuentran personajes, mostrar mensaje
            if (data.error) {
                setError('No se encontraron personajes. Favor, intente de nuevo.');
                setCharacters([]);
                setTotalPages(1);
                return;
            }
            //actualizar el estado con los datos obtenidos 
            setCharacters(data.results);
            setTotalPages(data.info.pages);
            setPage(newPage);
            setError('');
        } catch (error) {
            setError('Hubo un error al obtener los datos. Favor, intente de nuevo.');
            setCharacters([]);
        } finally {
            //finalizar carga
            setLoading(false);
        }
    };

    // Handler para buscar personajes
    const handleSearch = () => {
        const name = searchInput.current.value;
        fetchCharacters(name,1);
    };

    // Handler para busqueda a través del Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Handler para filtrar personajes por estado "alive"
    const handleFilterChange = (e) => {
        setFilterAlive(e.target.checked);
    };

    //Hande para paginacion
    const handlePreviousPage = () => {
        if (page > 1) {
            fetchCharacters(searchInput.current.value, page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            fetchCharacters(searchInput.current.value, page + 1);
        }
    };

    return (
        <div>
            {/* Input */}
            <input
                type="text"
                placeholder="Ingresa Personaje"
                ref={searchInput}
                onKeyDown={handleKeyPress}
            />

            {/* Botón de búsqueda */}
            <button onClick={handleSearch}>BUSCAR</button>

            {/* Checkbox para filtrar personajes vivos */}
            <input
                type="checkbox"
                id="filterAlive"
                onChange={handleFilterChange}
            />
            <label htmlFor="filterAlive">VIVOS</label>
            {/* Mostrar mensaje de carga */}
            {loading && <p className="loading-message">Cargando...</p>}

            {/* Mensaje de error */}
            {error && <p className="error-message">{error}</p>}

            {/* Mostrar los personajes */}
            <div className="box-personajes">
                {characters.map((character) => (
                    <div className="card-personaje-container" key={character.id}>
                        <div>
                            <img src={character.image} alt={character.name} />
                        </div>
                        <div>
                            <h3>{character.name}</h3>
                            <p><strong>Especie:</strong> {character.species}</p>
                            <p><strong>Estado:</strong> {character.status}</p>
                            <p><strong>Género:</strong> {character.gender}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Controles de paginación */}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Anterior
                </button>
                <span>Página {page} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default CharacterSearch;
    