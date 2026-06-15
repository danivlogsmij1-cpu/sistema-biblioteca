import { useState, useEffect } from 'react';
import libroService from '../services/libroService';
import categoriaService from '../services/categoriaService';
import './FormLibro.css';

export default function FormLibro({ onLibroCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publicationYear: new Date().getFullYear(),
    categoryId: '',
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
      if (!formData.title.trim() || !formData.author.trim()) {
        setError('Título y autor son requeridos');
        setLoading(false);
        return;
      }

      await libroService.createLibro(formData);
      setSuccess(true);
      setFormData({
        title: '',
        author: '',
        publicationYear: new Date().getFullYear(),
        categoryId: '',
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
              <label htmlFor="title" className="form-label">
                Título *
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título del libro"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="author" className="form-label">
                Autor *
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Nombre del autor"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="publicationYear" className="form-label">
                Año de Publicación
              </label>
              <input
                type="number"
                className="form-control"
                id="publicationYear"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleChange}
                placeholder="Año de publicación"
                min="1450"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="categoryId" className="form-label">
                Categoría
              </label>
              <select
                className="form-control"
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
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
