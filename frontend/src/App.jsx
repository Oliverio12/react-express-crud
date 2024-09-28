import useRutas from './useRutas';
import Navbar from './components/Navbar';

function App() {
  const {
    ComponentesRetornados
  } = useRutas();
  return (
    <>
      <Navbar />
      <ComponentesRetornados/>
      
    </>
  );
}

export default App;
