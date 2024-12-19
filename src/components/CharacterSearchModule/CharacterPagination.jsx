import React from "react";

function CharacterPagination({ page, totalPages, onNext, onPrev }) {
  return (
    <div>
      {/* Controles de paginación */}
      <div className="pagination">
        <button disabled={page === 1} onClick={onPrev}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={onNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default CharacterPagination;
