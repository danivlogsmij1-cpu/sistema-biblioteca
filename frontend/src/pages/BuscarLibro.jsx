import { useState } from 'react';
import libroService from '../services/libroService';
import './BuscarLibro.css';

export default function BuscarLibro() {
  const [searchType, setSearchType] = useState('titulo');
  const [searchQuery, setSearchQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      let data;
      if (searchType === 'titulo') {
        data = await libroService.searchByTitle(searchQuery);
      } else {
        data = await libroService.searchByAuthor(searchQuery);
      }
      setResultados(data);
    } catch (err) {
      setError('Error al buscar libros. Intenta nuevamente.');
      console.error(err);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setResultados([]);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="buscar-libro-page">
      <div className="container mt-5">
        <h1 className="mb-4">Buscar Libro 🔍</h1>

        <div className="search-container">
          <form onSubmit={handleSearch}>
            <div className="search-form">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="searchType" className="form-label">
                    Buscar por:
                  </label>
                  <select
                    id="searchType"
                    className="form-control"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="titulo">Título</option>
                    <option value="autor">Autor</option>
                  </select>
                </div>

                <div className="col-md-8 mb-3">
                  <label htmlFor="searchQuery" className="form-label">
                    Término de búsqueda:
                  </label>
                  <div className="input-group">
                    <input
                      id="searchQuery"
                      type="text"
                      className="form-control"
                      placeholder={`Buscar por ${searchType}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                  </div>
                </div>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              {searchQuery && (
                <div className="mt-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClear}
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {hasSearched && (
          <div className="results-container mt-5">
            <h3>
              Resultados {resultados.length > 0 && `(${resultados.length})`}
            </h3>

            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Buscando...</span>
                </div>
              </div>
            ) : resultados.length === 0 ? (
              <div className="alert alert-info">
                No se encontraron libros con "{searchQuery}"
              </div>
            ) : (
              <div className="row">
                {resultados.map((libro) => (
                  <div key={libro.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card libro-card">
                      <div className="card-body">
                        <h5 className="card-title">{libro.titulo}</h5>
                        <p className="card-text">
                          <strong>Autor:</strong> {libro.autor}
                        </p>
                        {libro.isbn && (
                          <p className="card-text">
                            <strong>ISBN:</strong> {libro.isbn}
                          </p>
                        )}
                        <div className="d-flex justify-content-between align-items-center">
                          <span className={`badge ${getEstadoClass(libro.estado)}`}>
                            {libro.estado}
                          </span>
                          {libro.categoriaId && (
                            <small className="text-muted">
                              ID Categoría: {libro.categoriaId}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function getEstadoClass(estado) {
  switch (estado) {
    case 'disponible':
      return 'badge-success';
    case 'prestado':
      return 'badge-warning';
    case 'mantenimiento':
      return 'badge-danger';
    default:
      return 'badge-secondary';
  }
}
