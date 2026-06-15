# Configuración de Conexión Frontend - Backend

## ✅ Cambios Realizados

### Servicios Actualizados
- **libroService.js**: Configurado para usar puerto 5000 y campos del backend (title, author, publicationYear, categoryId)
- **categoriaService.js**: Configurado para usar puerto 5000

### Componentes Ajustados
- **FormLibro.jsx**: Actualizado para usar campos: title, author, publicationYear, categoryId (sin isbn ni estado)
- **Libros.jsx**: Tabla actualizada con campos correctos del backend
- **BuscarLibro.jsx**: Ajustado para mostrar solo los campos disponibles en el backend

### Variables de Entorno
- **.env**: `VITE_API_URL=http://localhost:5000/api`
- **vite.config.js**: Proxy configurado al puerto 5000

## 🔗 Estructura de Conexión

```
Frontend (Puerto 5173)
    ↓
Axios Requests
    ↓
Backend API (Puerto 5000)
    ├── GET/POST/PUT/DELETE /api/libros
    ├── GET/POST/PUT/DELETE /api/categorias
    └── GET /api/health
```

## 📝 Campos del Backend

### Libros
- `id` (autoincrement)
- `title` (string, requerido)
- `author` (string, requerido)
- `publicationYear` (integer, opcional)
- `categoryId` (integer, requerido)
- `createdAt`, `updatedAt` (timestamps)

### Categorías
- `id` (autoincrement)
- `nombre` (string, requerido, único)
- `descripcion` (text, opcional)
- `createdAt`, `updatedAt` (timestamps)

## 🚀 Instrucciones para Ejecutar

### 1. Terminal 1 - Backend
```bash
cd sistema-biblioteca/backend
npm install
npm start
# El backend estará en http://localhost:5000
```

### 2. Terminal 2 - Frontend
```bash
cd sistema-biblioteca/frontend
npm install
npm run dev
# El frontend abrirá automáticamente en http://localhost:5173
```

## ✨ Rutas Disponibles en el Frontend

- `/` - Inicio (Página de Libros)
- `/libros` - Gestión de Libros
- `/categorias` - Gestión de Categorías
- `/buscar` - Búsqueda de Libros

## 🔍 Endpoints Disponibles en el Backend

### Libros
- `GET /api/libros` - Obtener todos los libros
- `GET /api/libros/:id` - Obtener libro por ID
- `POST /api/libros` - Crear nuevo libro
- `PUT /api/libros/:id` - Actualizar libro
- `DELETE /api/libros/:id` - Eliminar libro
- `GET /api/libros/buscar/titulo?titulo=...` - Buscar por título
- `GET /api/libros/buscar/autor?autor=...` - Buscar por autor

### Categorías
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/:id` - Obtener categoría por ID
- `POST /api/categorias` - Crear nueva categoría
- `PUT /api/categorias/:id` - Actualizar categoría
- `DELETE /api/categorias/:id` - Eliminar categoría

### Health Check
- `GET /api/health` - Verificar estado del servidor

## ⚠️ Notas Importantes

- El backend tiene CORS habilitado, por lo que el frontend puede hacer peticiones desde el puerto 5173
- Asegúrate de que el backend está ejecutándose antes de iniciar el frontend
- Las variables de entorno se configuran en el archivo `.env` del frontend
- Los campos del frontend están sincronizados con los del backend

## 🔧 Troubleshooting

### Error: "No se puede conectar a la API"
- Verifica que el backend esté corriendo en puerto 5000
- Revisa que no haya un cortafuegos bloqueando la conexión
- Comprueba que la URL en `.env` es correcta

### Error: "Categoría no existe"
- Asegúrate de crear categorías antes de crear libros
- Verifica que el `categoryId` sea válido

### Error: "CORS"
- El backend ya tiene CORS habilitado, no debería haber problema
- Si persiste, verifica que `cors` esté instalado en el backend
