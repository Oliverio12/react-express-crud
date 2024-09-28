function useFetch() {
  const urlBase = "http://127.0.0.1:8020/UserDB/v1/";

  const getFetch = (urlParcial) => {
    return fetch(`${urlBase}${urlParcial}`)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error al hacer GET:", error);
        throw error;
      });
  };

  const postFetch = (urlParcial, datos) => {
    return fetch(`${urlBase}${urlParcial}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error al hacer POST:", error);
        throw error;
      });
  };

  const puttFetch = (urlParcial, datos) => {
    return fetch(`${urlBase}${urlParcial}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error al hacer PUT:", error);
        throw error;
      });
  };

  const deleteFetch = (urlParcial) => {
    return fetch(`${urlBase}${urlParcial}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error al hacer DELETE:", error);
        throw error;
      });
  };

  return { getFetch, postFetch, puttFetch, deleteFetch };
}

export default useFetch;
