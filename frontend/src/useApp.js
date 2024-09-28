import { useState } from "react";
import useFetch from "./tools/useFetch";

function useApp() {
  const [users, setUsers] = useState([]);

  const { getFetch, postFetch, puttFetch, deleteFetch } = useFetch();

  const GetApiExpress = () => {
    getFetch('Users/')
      .then((response) => {
        console.log("Datos obtenidos desde la API:", response);

        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data); // Actualiza el estado si es un array
        } else {
          console.error("La respuesta no contiene un array en 'data'. Verifica la estructura:", response);
        }
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  };

  // Función para agregar un usuario dinámicamente
  const PostApiExpress = (newUser) => {
    postFetch('Users/', newUser)
      .then((response) => {
        console.log("Usuario creado:", response);
        GetApiExpress(); // Refresca la lista de usuarios
      })
      .catch((error) => {
        console.error("Error al crear usuario:", error);
      });
  };

  // Función para actualizar un usuario dinámicamente
  const PutApiExpress = (id, updatedUser) => {
    puttFetch(`Users/${id}`, updatedUser)
      .then((response) => {
        console.log("Usuario actualizado:", response);
        GetApiExpress(); // Refresca la lista de usuarios
      })
      .catch((error) => {
        console.error("Error al actualizar usuario:", error);
      });
  };

  const DeleteApiExpress = (id) => {
    deleteFetch(`Users/${id}`)
      .then((response) => {
        console.log("Usuario eliminado:", response);
        GetApiExpress(); // Refresca la lista de usuarios
      })
      .catch((error) => {
        console.error("Error al eliminar usuario:", error);
      });
  };

  return {
    GetApiExpress,
    PostApiExpress,
    PutApiExpress,
    DeleteApiExpress,
    users,
  };
}

export default useApp;
