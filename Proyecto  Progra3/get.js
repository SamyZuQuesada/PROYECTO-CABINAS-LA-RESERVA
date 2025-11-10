

// Base de la API (ajusta si cambias el backend)
const API_BASE = "http://localhost:3000";

// Realiza una petición fetch y devuelve JSON o lanza error con info útil.
async function fetchJSON(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    // Leemos el texto de error (si existe) para ayudar a depurar
    let errorText = "";
    try {
      errorText = await response.text();
    } catch (e) {
      // ignorar error al leer texto
    }

    throw new Error(
      `${(options && options.method) || "GET"} ${url} -> ${response.status}\n${errorText}`
    );
  }

  // Si es 204 No Content, no intentamos parsear JSON
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Asigna texto a un elemento de forma segura.
function setText(element, text) {
  if (element) {
    element.textContent = text != null ? text : "";
  }
}
