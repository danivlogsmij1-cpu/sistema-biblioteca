import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const libroService = {
  // Obtener todos los libros
  getAllLibros: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/libros`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener libros:', error);
      throw error;
    }
  },

  // Obtener libro por ID
  getLibroById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/libros/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener libro:', error);
      throw error;
    }
  },

  // Crear nuevo libro
  createLibro: async (libroData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/libros`, libroData);
      return response.data;
    } catch (error) {
      console.error('Error al crear libro:', error);
      throw error;
    }
  },

  // Actualizar libro
  updateLibro: async (id, libroData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/libros/${id}`, libroData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      throw error;
    }
  },

  // Eliminar libro
  deleteLibro: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/libros/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      throw error;
    }
  },

  // Buscar libros por título
  searchByTitle: async (titulo) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/libros/buscar/titulo`, {
        params: { titulo },
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar por título:', error);
      throw error;
    }
  },

  // Buscar libros por autor
  searchByAuthor: async (autor) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/libros/buscar/autor`, {
        params: { autor },
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar por autor:', error);
      throw error;
    }
  },
};

export default libroService;
