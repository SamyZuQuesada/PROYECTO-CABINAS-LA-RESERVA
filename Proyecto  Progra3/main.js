

// Función para actualizar el hero/about
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

// Función para actualizar servicios dinámicamente
function actualizarServicios(servicios) {
  if (!servicios || servicios.length === 0) return;
  
  const carruselServicio = document.getElementById('carrusel-servicio');
  if (!carruselServicio) return;
  
  // Limpiar slides existentes
  carruselServicio.innerHTML = '';
  
  // Crear slides dinámicos
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
  
  // Reinicializar el carrusel si se actualizaron los servicios
  reinicializarCarrusel();
}

// Función para actualizar testimonios dinámicamente
function actualizarTestimonios(testimonios) {
  if (!testimonios || testimonios.length === 0) return;
  
  const testimoniosGrid = document.querySelector('.testimonios-grid');
  if (!testimoniosGrid) return;
  
  // Limpiar testimonios existentes
  testimoniosGrid.innerHTML = '';
  
  // Crear testimonios dinámicos
  testimonios.forEach(testimonio => {
    const iniciales = obtenerIniciales(testimonio.name);
    const estrellas = '★'.repeat(parseInt(testimonio.rating)) + '☆'.repeat(5 - parseInt(testimonio.rating));
    
    const testimonioCard = document.createElement('article');
    testimonioCard.className = 'testimonio-card scroll-animate-stagger';
    testimonioCard.innerHTML = `
      <div class="testimonio-header">
        <div class="cliente-avatar">${iniciales}</div>
        <div class="cliente-info">
          <h4>${testimonio.name}</h4>
          <div class="estrellas">${estrellas}</div>
        </div>
      </div>
      <p>"${testimonio.description}"</p>
      <div class="testimonio-fecha">${testimonio.date}</div>
    `;
    testimoniosGrid.appendChild(testimonioCard);
  });
  
  // Reiniciar observer para animaciones
  const animateElements = document.querySelectorAll('.scroll-animate-stagger');
  animateElements.forEach((el) => observer.observe(el));
}

// Función auxiliar para obtener iniciales
function obtenerIniciales(nombre) {
  return nombre
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

// Función para reinicializar el carrusel después de actualizar servicios
function reinicializarCarrusel() {
  const carrusel = document.getElementById("carrusel-servicio");
  const slides = document.querySelectorAll(".slide_Servicio");
  const dotsContainer = document.getElementById("dots");
  
  if (!slides.length) return;
  
  // Limpiar dots existentes
  dotsContainer.innerHTML = '';
  
  // Recrear dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Ir a slide ${index + 1}`);
    dot.setAttribute("aria-current", index === 0 ? "true" : "false");
    dot.addEventListener("click", () => irASlide(index));
    dotsContainer.appendChild(dot);
  });
  
  indiceActual = 0;
  actualizarCarrusel();
}

//----------------------------------------------------------------------------//

// Carrusel de servicios
const carrusel = document.getElementById("carrusel-servicio")
const slides = document.querySelectorAll(".slide_Servicio")
const dotsContainer = document.getElementById("dots")
const btnAtras = document.getElementById("botonAtrasSer")
const btnAdelante = document.getElementById("botonAdelanteSer")

let indiceActual = 0
const totalSlides = slides.length

// Crear dots
slides.forEach((_, index) => {
  const dot = document.createElement("button")
  dot.setAttribute("aria-label", `Ir a slide ${index + 1}`)
  dot.setAttribute("aria-current", index === 0 ? "true" : "false")
  dot.addEventListener("click", () => irASlide(index))
  dotsContainer.appendChild(dot)
})

const dots = dotsContainer.querySelectorAll("button")

function actualizarCarrusel() {
  carrusel.style.transform = `translateX(-${indiceActual * 100}%)`
  dots.forEach((dot, index) => {
    dot.setAttribute("aria-current", index === indiceActual ? "true" : "false")
  })
}

function irASlide(index) {
  indiceActual = index
  actualizarCarrusel()
}

function siguiente() {
  indiceActual = (indiceActual + 1) % totalSlides
  actualizarCarrusel()
}

function anterior() {
  indiceActual = (indiceActual - 1 + totalSlides) % totalSlides
  actualizarCarrusel()
}

btnAdelante.addEventListener("click", siguiente)
btnAtras.addEventListener("click", anterior)

// Auto-play (opcional)
setInterval(siguiente, 5000)

// Modales
function abrirModal(id) {
  const modal = document.getElementById(id)
  if (modal) {
    modal.style.display = "flex"
    document.body.style.overflow = "hidden"
  }
}

function cerrarModal(id) {
  const modal = document.getElementById(id)
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none"
    document.body.style.overflow = "auto"
  }
})

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll(".opciones a").forEach((link) => {
  link.addEventListener("click", () => {
    const navToggle = document.getElementById("navToggle")
    if (navToggle) {
      navToggle.checked = false
    }
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
      // Optional: stop observing after animation
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all elements with scroll-animate class
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".scroll-animate, .scroll-animate-stagger")
  animateElements.forEach((el) => observer.observe(el))
})

let index = 0;
const imgs = document.querySelectorAll('.slider img');

function showNext() {
  imgs[index].classList.remove('active');
  index = (index + 1) % imgs.length;
  imgs[index].classList.add('active');
}

setInterval(showNext, 4000); // cambia cada 4 segundos
