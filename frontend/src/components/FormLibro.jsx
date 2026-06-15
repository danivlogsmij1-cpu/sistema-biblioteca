import { useState, useEffect } from 'react';
import libroService from '../services/libroService';
import categoriaService from '../services/categoriaService';
import './FormLibro.css';

export default function FormLibro({ onLibroCreated }) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    estado: 'disponible',
    categoriaId: '',
  });
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const data = await categoriaService.getAllCategorias();
      setCategorias(data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!formData.titulo.trim() || !formData.autor.trim()) {
        setError('Título y autor son requeridos');
        setLoading(false);
        return;
      }

      await libroService.createLibro(formData);
      setSuccess(true);
      setFormData({
        titulo: '',
        autor: '',
        isbn: '',
        estado: 'disponible',
        categoriaId: '',
      });

      setTimeout(() => setSuccess(false), 3000);

      if (onLibroCreated) {
        onLibroCreated();
      }
    } catch (err) {
      setError('Error al crear el libro. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-libro-container">
      <div className="form-libro">
        <h3>Registrar Nuevo Libro</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">Libro registrado exitosamente</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="titulo" className="form-label">
                Título *
              </label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Título del libro"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="autor" className="form-label">
                Autor *
              </label>
              <input
                type="text"
                className="form-control"
                id="autor"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                placeholder="Nombre del autor"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="isbn" className="form-label">
                ISBN
              </label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="ISBN del libro"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="categoriaId" className="form-label">
                Categoría
              </label>
              <select
                className="form-control"
                id="categoriaId"
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <select
              className="form-control"
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="disponible">Disponible</option>
              <option value="prestado">Prestado</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Libro'}
          </button>
        </form>
      </div>
    </div>
  );
}
