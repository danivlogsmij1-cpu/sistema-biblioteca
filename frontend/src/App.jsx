import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Libros from './pages/Libros';
import Categorias from './pages/Categorias';
import BuscarLibro from './pages/BuscarLibro';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Libros />} />
        <Route path="/libros" element={<Libros />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/buscar" element={<BuscarLibro />} />
      </Routes>
    </Router>
  );
}

export default App;
