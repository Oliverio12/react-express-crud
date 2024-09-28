import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import useApp from "../useApp"; 

function Edith() {
  const { state } = useLocation(); 
  const { PutApiExpress, PostApiExpress } = useApp(); 

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  useEffect(() => {
    if (state && state.user) {
      setFormData({
        userName: state.user.userName,
        email: state.user.email,
        password: ''
      });
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state && state.user) {
      PutApiExpress(state.user.idUser, formData);
    } else {
      PostApiExpress(formData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-blue-600">
        {state && state.user ? "Editar un Usuario" : "Agregar un Usuario"}
      </h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4 w-1/3">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {state && state.user ? "Actualizar Usuario" : "Agregar Usuario"}
        </button>
      </form>
    </div>
  );
}

export default Edith;
