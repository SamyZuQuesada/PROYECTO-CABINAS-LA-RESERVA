const API_BASE_URL = 'http://localhost:3000';

//carga los datos del url
function cargarDatosDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const testimonioParam = urlParams.get('testimonio');
     
    if (testimonioParam) {
        try {
            const testimonio = JSON.parse(decodeURIComponent(testimonioParam));
            
            // Llenar el formulario automáticamente
            document.getElementById('testimonio_id').value = testimonio.id;
            document.getElementById('autor').value = testimonio.name;
            document.getElementById('texto').value = testimonio.description;
            
            // Mostrar información
            const infoDiv = document.getElementById('testimonio-info');
            const infoText = document.getElementById('info-text');
            infoDiv.style.display = 'block';
            infoText.textContent = `Editando testimonio de: ${testimonio.name}`;
            
        } catch (error) {
            console.error('Error al cargar datos desde URL:', error);
        }
    }
}

// FUNCIÓN PARA MOSTRAR MENSAJES
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = tipo;
    mensajeDiv.style.display = 'block';
    
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 4000);
}

// FORMULARIO LANDING (HERO SECTION)
document.getElementById('form-hero').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const logoUrl = document.getElementById('logo_url').value;
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    
    try {
        const datos = {
            logoUrl: logoUrl,
            title: titulo,
            description: descripcion
        };
            
        const response = await fetch(`${API_BASE_URL}/landing/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar el hero section');
        }
        
        const result = await response.json();
        mostrarMensaje('Hero section actualizado exitosamente', 'success');

        // Recargar la página principal
        if (window.opener && !window.opener.closed) {
            window.opener.location.reload();
        }
        
        // Opcional: Cerrar la ventana después de actualizar
        setTimeout(() => {
            window.close();
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al actualizar hero section: ' + error.message, 'error');
    }
});

// FORMULARIO SERVICIOS
document.getElementById('form-servicio').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('servicio_id').value;
    const nombre = document.getElementById('titulo_servicio').value;
    const descripcion = document.getElementById('descripcion_servicio').value;
    const imagenUrl = document.getElementById('imagen_servicio').value;
    
    if (!id || !nombre || !descripcion || !imagenUrl) {
        mostrarMensaje('Por favor complete todos los campos requeridos', 'error');
        return;
    }
    
    try {
        const datos = {
            nombre: nombre,
            descripcion: descripcion,
            imagenUrl: imagenUrl
        };
            
        const response = await fetch(`${API_BASE_URL}/servicios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar el servicio');
        }
        
        const result = await response.json();
        mostrarMensaje('Servicio actualizado exitosamente', 'success');

        // Recargar la página principal
        if (window.opener && !window.opener.closed) {
            window.opener.location.reload();
        }
        
        // Opcional: Cerrar la ventana después de actualizar
        setTimeout(() => {
            window.close();
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al actualizar servicio: ' + error.message, 'error');
    }
});

// FORMULARIO TESTIMONIOS
document.getElementById('form-testimonio').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('testimonio_id').value;
    const name = document.getElementById('autor').value;
    const description = document.getElementById('texto').value;
    
    if (!id || !name || !description) {
        mostrarMensaje('Por favor complete todos los campos requeridos', 'error');
        return;
    }
    
    try {
        const datos = {
            name: name,
            description: description
        };
            
        const response = await fetch(`${API_BASE_URL}/testimonios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar el testimonio');
        }
        
        const result = await response.json();
        mostrarMensaje('Testimonio actualizado exitosamente', 'success');

        // Recargar la página principal
        if (window.opener && !window.opener.closed) {
            window.opener.location.reload();
        }
        
        // Opcional: Cerrar la ventana después de actualizar
        setTimeout(() => {
            window.close();
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al actualizar testimonio: ' + error.message, 'error');
    }
});

// Botón para limpiar formulario
document.getElementById('btn-limpiar').addEventListener('click', () => {
    document.getElementById('form-testimonio').reset();
    const infoDiv = document.getElementById('testimonio-info');
    infoDiv.style.display = 'none';
});

// Cargar datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosDesdeURL();
});