const baseUrl = "http://localhost:3000/landing";

//Llama el landing completo con el servicio y testimonios
function getLanding() {
  return fetch(baseUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error al obtener datos:', error);
      throw error;
    });
}

//Put 
function updateLanding(id, landingData) {
  return fetch(`${baseUrl}/${id}`, { 
    method: 'PUT',
    body: JSON.stringify(landingData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error('Error en la actualización');
      return response.json();
    })
    .then((json) => {
      console.log('Datos actualizados:', json);
      return json;
    })
    .catch(error => {
      console.error('Error al actualizar:', error);
      throw error;
    });
}
