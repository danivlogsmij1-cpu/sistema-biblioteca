import { useState, useEffect } from 'react';
import categoriaService from '../services/categoriaService';
import FormCategoria from '../components/FormCategoria';
import './Categorias.css';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const data = await categoriaService.getAllCategorias();
      setCategorias(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await categoriaService.deleteCategoria(id);
        setCategorias(categorias.filter((c) => c.id !== id));
      } catch (err) {
        setError('Error al eliminar la categoría');
        console.error(err);
      }
    }
  };

  const startEdit = (categoria) => {
    setEditingId(categoria.id);
    setEditData({ ...categoria });
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
      await categoriaService.updateCategoria(id, editData);
      setCategorias(categorias.map((c) => (c.id === id ? editData : c)));
      setEditingId(null);
    } catch (err) {
      setError('Error al actualizar la categoría');
      console.error(err);
    }
  };

  return (
    <div className="categorias-page">
      <div className="container mt-5">
        <h1 className="mb-4">Gestión de Categorías 📚</h1>

        {error && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}

        <FormCategoria onCategoriaCreated={loadCategorias} />

        <div className="mt-5">
          <h3>Listado de Categorías</h3>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : categorias.length === 0 ? (
            <div className="alert alert-info">No hay categorías registradas</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.id}</td>
                      <td>
                        {editingId === categoria.id ? (
                          <input
                            type="text"
                            name="nombre"
                            value={editData.nombre}
                            onChange={handleEditChange}
                            className="form-control form-control-sm"
                          />
                        ) : (
                          categoria.nombre
                        )}
                      </td>
                      <td>
                        {editingId === categoria.id ? (
                          <textarea
                            name="descripcion"
                            value={editData.descripcion}
                            onChange={handleEditChange}
                            className="form-control form-control-sm"
                            rows="2"
                          />
                        ) : (
                          categoria.descripcion || '-'
                        )}
                      </td>
                      <td>
                        {editingId === categoria.id ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => saveEdit(categoria.id)}
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
                              onClick={() => startEdit(categoria)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(categoria.id)}
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
