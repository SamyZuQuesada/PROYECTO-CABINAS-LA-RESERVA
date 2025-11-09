//----------------------------------------------------------------------------//
//------BACKEND URL------//
//----------------------------------------------------------------------------//

const BACKEND_URL = 'http://localhost:3000';

//----------------------------------------------------------------------------//
//------FUNCIONES PARA MOSTRAR MENSAJES------//
//----------------------------------------------------------------------------//

function mostrarMensaje(texto, tipo = 'success') {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  mensaje.className = tipo;
  mensaje.style.display = 'block';
  
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 5000);
}

//----------------------------------------------------------------------------//
//------ACTUALIZAR HERO SECTION (LANDING)------//
//----------------------------------------------------------------------------//

document.getElementById('form-hero').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const logoUrl = document.getElementById('logo_url').value;
  const title = document.getElementById('titulo').value;
  const description = document.getElementById('descripcion').value;
  
  if (!title || !description) {
    mostrarMensaje('Por favor complete todos los campos requeridos', 'error');
    return;
  }
  
  try {
    const response = await fetch(`${BACKEND_URL}/landing/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        logoUrl: logoUrl || undefined,
        title: title,
        description: description
      })
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar el Hero Section');
    }
    
    const result = await response.json();
    mostrarMensaje('Hero Section actualizado exitosamente', 'success');
    
    // Limpiar formulario
    document.getElementById('form-hero').reset();
    
  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error al actualizar Hero Section: ' + error.message, 'error');
  }
});

//----------------------------------------------------------------------------//
//------ACTUALIZAR SERVICIO------//
//----------------------------------------------------------------------------//

document.getElementById('form-servicio').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = document.getElementById('servicio_id').value;
  const nombre = document.getElementById('titulo_servicio').value;
  const descripcion = document.getElementById('descripcion_servicio').value;
  const imagenUrl = document.getElementById('imagen_servicio').value;
  
  if (!id || !nombre || !descripcion || !imagenUrl) {
    mostrarMensaje('Por favor complete todos los campos', 'error');
    return;
  }
  
  try {
    const response = await fetch(`${BACKEND_URL}/servicios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre,
        descripcion: descripcion,
        imagenUrl: imagenUrl
      })
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar el servicio');
    }
    
    const result = await response.json();
    mostrarMensaje('Servicio actualizado exitosamente', 'success');
    
    // Limpiar formulario
    document.getElementById('form-servicio').reset();
    
  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error al actualizar servicio: ' + error.message, 'error');
  }
});

//----------------------------------------------------------------------------//
//------ACTUALIZAR TESTIMONIO------//
//----------------------------------------------------------------------------//

document.getElementById('form-testimonio').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = document.getElementById('testimonio_id').value;
  const name = document.getElementById('autor').value;
  const description = document.getElementById('texto').value;
  const rating = document.getElementById('puntuacion').value;
  
  if (!id || !name || !description || !rating) {
    mostrarMensaje('Por favor complete todos los campos', 'error');
    return;
  }
  
  if (rating < 1 || rating > 5) {
    mostrarMensaje('La puntuación debe estar entre 1 y 5', 'error');
    return;
  }
  
  try {
    const response = await fetch(`${BACKEND_URL}/testimonios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        rating: rating.toString()
      })
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar el testimonio');
    }
    
    const result = await response.json();
    mostrarMensaje('Testimonio actualizado exitosamente', 'success');
    
    // Limpiar formulario
    document.getElementById('form-testimonio').reset();
    
  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error al actualizar testimonio: ' + error.message, 'error');
  }
});