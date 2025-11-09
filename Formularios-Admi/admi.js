const baseUrl = "http://localhost:3000/landing";

//Llama el landing completo con el servicio y testimonios
function getLanding() {
  return fetch(baseUrl)
    .then(response => response.json());
}

//Put
function updateLanding(landingData) {
  return fetch(baseUrl + IdleDeadline, {
    method: 'PUT',
    body: JSON.stringify(landingData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
