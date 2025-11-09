//----------------------------------------------------------------------------//
//------CARGAR DATOS DESDE URL------//
//----------------------------------------------------------------------------//
 
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

//----------------------------------------------------------------------------//
//------ACTUALIZAR TESTIMONIO------//
//----------------------------------------------------------------------------//

document.getElementById('form-testimonio').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('testimonio_id').value;
    const name = document.getElementById('autor').value;
    const description = document.getElementById('texto').value;
    const rating = document.getElementById('puntuacion').value;
    
    if (!id || !name || !description) {
        mostrarMensaje('Por favor complete todos los campos requeridos', 'error');
        return;
    }
    
    try {
        const datos = {
            name: name,
            description: description
        };
        
        // Solo agregar rating si se proporcionó
        if (rating && rating >= 1 && rating <= 5) {
            datos.rating = rating.toString();
        }
        
        const response = await fetch(`${BACKEND_URL}/testimonios/${id}`, {
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