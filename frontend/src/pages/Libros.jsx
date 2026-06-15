import { useState, useEffect } from 'react';
import libroService from '../services/libroService';
import FormLibro from '../components/FormLibro';
import './Libros.css';

export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadLibros();
  }, []);

  const loadLibros = async () => {
    try {
      setLoading(true);
      const data = await libroService.getAllLibros();
      setLibros(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los libros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      try {
        await libroService.deleteLibro(id);
        setLibros(libros.filter((l) => l.id !== id));
      } catch (err) {
        setError('Error al eliminar el libro');
        console.error(err);
      }
    }
  };

  const startEdit = (libro) => {
    setEditingId(libro.id);
    setEditData({ ...libro });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const saveEdit = async (id) => {
    try {
      await libroService.updateLibro(id, editData);
      setLibros(libros.map((l) => (l.id === id ? editData : l)));
      setEditingId(null);
    } catch (err) {
      setError('Error al actualizar el libro');
      console.error(err);
    }
  };

  const getEstadoClass = (estado) => {
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
  };

  return (
    <div className="libros-page">
      <div className="container mt-5">
        <h1 className="mb-4">Gestión de Libros 📖</h1>

        {error && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}

        <FormLibro onLibroCreated={loadLibros} />

        <div className="mt-5">
          <h3>Listado de Libros</h3>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : libros.length === 0 ? (
            <div className="alert alert-info">No hay libros registrados</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>ISBN</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {libros.map((libro) => (
                    <tr key={libro.id}>
                      <td>{libro.id}</td>
                      <td>
                        {editingId === libro.id ? (
                          <input
                            type="text"
                            name="titulo"
                            value={editData.titulo}
                            onChange={handleEditChange}
                            className="form-control form-control-sm"
                          />
                        ) : (
                          libro.titulo
                        )}
                      </td>
                      <td>
                        {editingId === libro.id ? (
                          <input
                            type="text"
                            name="autor"
                            value={editData.autor}
                            onChange={handleEditChange}
                            className="form-control form-control-sm"
                          />
                        ) : (
                          libro.autor
                        )}
                      </td>
                      <td>
                        {editingId === libro.id ? (
                          <input
                            type="text"
                            name="isbn"
                            value={editData.isbn}
                            onChange={handleEditChange}
                            className="form-control form-control-sm"
                          />
                        ) : (
                          libro.isbn || '-'
                        )}
                      </td>
                      <td>
                        {editingId === libro.id ? (
                          <select
                            name="estado"
                            value={editData.estado}
                            onChange={handleEditChange}
                            className="form-control form-control-sm"
                          >
                            <option value="disponible">Disponible</option>
                            <option value="prestado">Prestado</option>
                            <option value="mantenimiento">Mantenimiento</option>
                          </select>
                        ) : (
                          <span className={`badge ${getEstadoClass(libro.estado)}`}>
                            {libro.estado}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingId === libro.id ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => saveEdit(libro.id)}
                            >
                              Guardar
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={cancelEdit}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => startEdit(libro)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(libro.id)}
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
