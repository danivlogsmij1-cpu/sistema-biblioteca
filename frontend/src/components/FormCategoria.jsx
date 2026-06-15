import { useState } from 'react';
import categoriaService from '../services/categoriaService';
import './FormCategoria.css';

export default function FormCategoria({ onCategoriaCreated }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      if (!formData.nombre.trim()) {
        setError('El nombre de la categoría es requerido');
        setLoading(false);
        return;
      }

      await categoriaService.createCategoria(formData);
      setSuccess(true);
      setFormData({ nombre: '', descripcion: '' });

      setTimeout(() => setSuccess(false), 3000);

      if (onCategoriaCreated) {
        onCategoriaCreated();
      }
    } catch (err) {
      setError('Error al crear la categoría. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-categoria-container">
      <div className="form-categoria">
        <h3>Crear Nueva Categoría</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">
            Categoría creada exitosamente
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre Categoría *
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Ficción, Ciencia, Historia"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              placeholder="Descripción de la categoría..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Categoría'}
          </button>
        </form>
      </div>
    </div>
  );
}
