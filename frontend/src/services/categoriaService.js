import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const categoriaService = {
  // Obtener todas las categorías
  getAllCategorias: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categorias`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  // Obtener categoría por ID
  getCategoriaById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      throw error;
    }
  },

  // Crear nueva categoría
  createCategoria: async (categoriaData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categorias`, categoriaData);
      return response.data;
    } catch (error) {
      console.error('Error al crear categoría:', error);
      throw error;
    }
  },

  // Actualizar categoría
  updateCategoria: async (id, categoriaData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/categorias/${id}`, categoriaData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      throw error;
    }
  },

  // Eliminar categoría
  deleteCategoria: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      throw error;
    }
  },
};

export default categoriaService;
