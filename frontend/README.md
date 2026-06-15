# Frontend del Sistema Biblioteca

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:5173`

## Build

```bash
npm run build
```

## Características

### Componentes
- **Navbar**: Barra de navegación principal
- **FormCategoria**: Formulario para registrar categorías
- **FormLibro**: Formulario para registrar libros

### Páginas
- **Libros**: Gestión completa de libros (CRUD)
- **Categorías**: Gestión de categorías (CRUD)
- **BuscarLibro**: Búsqueda de libros por título o autor

### Servicios
- **libroService.js**: Consumo de API para libros
- **categoriaService.js**: Consumo de API para categorías

## Diseño
- Utiliza Bootstrap 5 para estilos responsivos
- CSS personalizado para mejorar la experiencia visual
- Interfaz clara y funcional
- Iconos emoji para mejor legibilidad

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```
VITE_API_URL=http://localhost:3000/api
```

## Requisitos
- Node.js 16+
- npm o yarn
