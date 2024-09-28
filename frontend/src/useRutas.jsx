import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Edith from './routes/Edith';

function useRutas() {
    const ComponentesRetornados = ()=>{
        return (
            <Routes>
            {/* Definimos las rutas */}
            <Route path="/" element={<Home />} />
            <Route path="/Edith" element={<Edith />} />
          </Routes>
      )
      }


  return {
    ComponentesRetornados
  }
}

export default useRutas