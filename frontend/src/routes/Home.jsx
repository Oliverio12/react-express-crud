import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useApp from '../useApp'; 

function Home() {
  const {
    GetApiExpress,
    DeleteApiExpress,
    users,
  } = useApp();
  
  const navigate = useNavigate(); 

  const [usernameFilter, setUsernameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');

  useEffect(() => {
    GetApiExpress(); 
  }, []);

  useEffect(() => {
    console.log("Usuarios actuales:", users); // Verifica la estructura de los datos
  }, [users]);

  const filteredUsers = Array.isArray(users) ? users.filter((user) => {
    return (
      user?.userName?.toLowerCase().includes(usernameFilter.toLowerCase()) &&
      user?.email?.toLowerCase().includes(emailFilter.toLowerCase())
    );
  }) : [];

  const handleAddUser = () => {
    navigate('/Edith', { state: { user: null } }); // Redirigimos con un usuario nulo (formulario vacío)
  };

  const handleEditUser = (user) => {
    navigate('/Edith', { state: { user } }); // Redirigimos con los datos del usuario a editar
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Usuarios Registrados</h1>

      {/* Filtros */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Filtrar por usuario"
          className="border p-2 rounded w-1/2 mr-2"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por correo"
          className="border p-2 rounded w-1/2"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddUser} // Redirigimos al formulario vacío
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Agregar Usuario
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <p>No se encontraron usuarios</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Username</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Password</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Created At</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Updated At</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.idUser} className="border-t">
                <td className="py-3 px-4">{user.idUser}</td>
                <td className="py-3 px-4">{user.userName}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">*********</td>
                <td className="py-3 px-4">{user.created_at}</td>
                <td className="py-3 px-4">{user.updated_at}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEditUser(user)} // Redirigimos al formulario de edición con los datos del usuario
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => DeleteApiExpress(user.idUser)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
