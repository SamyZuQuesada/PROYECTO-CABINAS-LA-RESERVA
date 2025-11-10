const API_BASE_URL = 'http://localhost:3000'; //ruta base del backend

// APIs unificadas    
const landingApi = {
    getData: async () => {
        const response = await fetch(`${API_BASE_URL}/landing`);
        if (!response.ok) {
            throw new Error('Error al cargar datos del backend');
        }
        return await response.json();
    },
};
  
const testimoniosApi = {
    getTestimonios: async () => {
        const response = await fetch(`${API_BASE_URL}/testimonios`);
        if (!response.ok) throw new Error('Error al cargar testimonios');
        return await response.json();
    },

    updateTestimonio: async (id, datos) => {
        const datosConFecha = {
            ...datos,
            date: new Date().toISOString() // Guarda en formato ISO para calcular después
        };

        const response = await fetch(`${API_BASE_URL}/testimonios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosConFecha)
        });
        if (!response.ok) throw new Error('Error al actualizar testimonio');
        return await response.json();
    }
};
//funcion para redirigir al formulario
function editarTestimonio(id, nombre, descripcion) {
    //codifica los datos para pasarlos por url
    const datosCodificados = encodeURIComponent(JSON.stringify({
        id: id,
        name: nombre,
        description: descripcion
    }));
    
    //redirige al panel de administracion con los datos:
    window.open(`admin.html?testimonio=${datosCodificados}`, '_blank');
}

function getIniciales(nombre) {
    if (!nombre) return 'U';
    return nombre.split(' ').map(palabra => palabra[0]).join('').toUpperCase().substring(0, 2);
}

function formatearFecha(fechaString) {
    if (!fechaString) return '';
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function obtenerIniciales(nombre) {
    return nombre
        .split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}


// Función principal para cargar datos del backend
async function cargarDatosBackend() {
    try {
        const landing = await landingApi.getData();
        console.log('Datos cargados:', landing);
        
        // Actualizar las secciones con datos del backend
        actualizarHero(landing);
        actualizarServicios(landing.servicios);
        actualizarTestimonios(landing.testimonios);
        
    } catch (error) {
        console.error('Error al conectar con el backend:', error);
        // Continuar mostrando los datos estáticos si falla el backend
    }
}

// Función para calcular "hace cuanto tiempo"
function tiempoRelativo(fechaISO) {
    const ahora = new Date();
    const fecha = new Date(fechaISO);
    const segundos = Math.floor((ahora - fecha) / 1000);
    
    // Calcular intervalos
    const intervalos = [
        { nombre: 'año', segundos: 31536000 },
        { nombre: 'mes', segundos: 2592000 },
        { nombre: 'semana', segundos: 604800 },
        { nombre: 'día', segundos: 86400 },
        { nombre: 'hora', segundos: 3600 },
        { nombre: 'minuto', segundos: 60 },
        { nombre: 'segundo', segundos: 1 }
    ];
    
    for (const intervalo of intervalos) {
        const contador = Math.floor(segundos / intervalo.segundos);
        
        if (contador >= 1) {
            if (contador === 1) {
                return `hace ${contador} ${intervalo.nombre}`;
            } else {
                //pluralizar
                const nombrePlural = intervalo.nombre === 'mes' ? 'meses' : 
                                   intervalo.nombre + 's';
                return `hace ${contador} ${nombrePlural}`;
            }
        }
    }
    
    return 'hace un momento';
}

function actualizarHero(landing) {
    if (landing.title) {
        const heroTitulo = document.querySelector('.hero-texto h1');
        if (heroTitulo) {
            heroTitulo.innerHTML = `¡Bienvenidos a <span class="resaltado">${landing.title}</span>!`;
        }
    }
    
    if (landing.description) {
        const heroDescripcion = document.querySelector('.hero-texto h2');
        if (heroDescripcion) {
            heroDescripcion.textContent = landing.description;
        }
    }
    
    if (landing.logoUrl) {
        const logo = document.querySelector('.logo img');
        if (logo) {
            logo.src = landing.logoUrl;
        }
    }
}

function actualizarServicios(servicios) {
    if (!servicios || servicios.length === 0) return;
    
    const carruselServicio = document.getElementById('carrusel-servicio');
    if (!carruselServicio) return;
    
  
    carruselServicio.innerHTML = '';
    
    
    servicios.forEach(servicio => {
        const slide = document.createElement('div');
        slide.className = 'slide_Servicio';
        slide.innerHTML = `
            <img src="${servicio.imagenUrl}" alt="${servicio.nombre}">
            <div class="overlayServicio">
                <h3>${servicio.nombre}</h3>
                <p>${servicio.descripcion}</p>
            </div>
        `;
        carruselServicio.appendChild(slide);
    });
    
    // Reinicializar el carrusel
    reinicializarCarrusel();
}

function actualizarTestimonios(testimonios) {
    if (!testimonios || testimonios.length === 0) return;
    
    const testimoniosGrid = document.querySelector('.testimonios-grid');
    if (!testimoniosGrid) return;
    
    // Limpiar testimonios existentes
    testimoniosGrid.innerHTML = '';
    
    // Crear testimonios dinámicos
    testimonios.forEach(testimonio => {
        const iniciales = obtenerIniciales(testimonio.name);
        
        const testimonioCard = document.createElement('article');
        testimonioCard.className = 'testimonio-card scroll-animate-stagger';
        testimonioCard.innerHTML = `
            <div class="testimonio-header">
                <div class="cliente-avatar">${iniciales}</div>
                <div class="cliente-info">
                    <h4>${testimonio.name}</h4>
                    <div class="tiempo-relativo">${tiempoRelativo(testimonio.date)}</div>
                </div>
            </div>
            <p>"${testimonio.description}"</p>
        `;
        testimoniosGrid.appendChild(testimonioCard);
    });
    
    const animateElements = document.querySelectorAll('.scroll-animate-stagger');
    animateElements.forEach((el) => observer.observe(el));
}


let indiceActual = 0;
let totalSlides = 0;
let carruselInterval;

function reinicializarCarrusel() {
    const carrusel = document.getElementById("carrusel-servicio");
    const slides = document.querySelectorAll(".slide_Servicio");
    const dotsContainer = document.getElementById("dots");
    
    if (!slides.length) return;
    
    // Limpiar dots existentes
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
    }
    

    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Ir a slide ${index + 1}`);
        dot.setAttribute("aria-current", index === 0 ? "true" : "false");
        dot.addEventListener("click", () => irASlide(index));
        if (dotsContainer) {
            dotsContainer.appendChild(dot);
        }
    });
    
    indiceActual = 0;
    totalSlides = slides.length;
    actualizarCarrusel();
    
    // Reiniciar auto-play
    if (carruselInterval) {
        clearInterval(carruselInterval);
    }
    if (slides.length > 0) {
        carruselInterval = setInterval(siguiente, 5000);
    }
}

function actualizarCarrusel() {
    const carrusel = document.getElementById("carrusel-servicio");
    const dotsContainer = document.getElementById("dots");
    const dots = dotsContainer ? dotsContainer.querySelectorAll("button") : [];
    
    if (carrusel) {
        carrusel.style.transform = `translateX(-${indiceActual * 100}%)`;
    }
    
    dots.forEach((dot, index) => {
        dot.setAttribute("aria-current", index === indiceActual ? "true" : "false");
    });
}

function irASlide(index) {
    indiceActual = index;
    actualizarCarrusel();
}

function siguiente() {
    if (totalSlides > 0) {
        indiceActual = (indiceActual + 1) % totalSlides;
        actualizarCarrusel();
    }
}

function anterior() {
    if (totalSlides > 0) {
        indiceActual = (indiceActual - 1 + totalSlides) % totalSlides;
        actualizarCarrusel();
    }
}


let sliderIndex = 0;
let sliderInterval;

function inicializarSlider() {
    const imgs = document.querySelectorAll('.slider img');
    
    if (imgs.length > 0) {
        // Limpiar intervalo anterior si existe
        if (sliderInterval) {
            clearInterval(sliderInterval);
        }
        
        // Configurar nuevo intervalo
        sliderInterval = setInterval(showNext, 4000);
    }
}

function showNext() {
    const imgs = document.querySelectorAll('.slider img');
    
    if (imgs.length > 0) {
        imgs[sliderIndex].classList.remove('active');
        sliderIndex = (sliderIndex + 1) % imgs.length;
        imgs[sliderIndex].classList.add('active');
    }
}



function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll(".opciones a").forEach((link) => {
    link.addEventListener("click", () => {
        const navToggle = document.getElementById("navToggle");
        if (navToggle) {
            navToggle.checked = false;
        }
    });
});



const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


function inicializarApp() {
    cargarDatosBackend();
    
   
    reinicializarCarrusel();
    
    
    inicializarSlider();
    
   
    const btnAdelante = document.getElementById("botonAdelanteSer");
    const btnAtras = document.getElementById("botonAtrasSer");
    
    if (btnAdelante) btnAdelante.addEventListener("click", siguiente);
    if (btnAtras) btnAtras.addEventListener("click", anterior);
    
    // Configurar scroll animations
    const animateElements = document.querySelectorAll(".scroll-animate, .scroll-animate-stagger");
    animateElements.forEach((el) => observer.observe(el));

    // CARGAR TESTIMONIOS AL INICIAR
    cargarTestimonios();
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", inicializarApp);