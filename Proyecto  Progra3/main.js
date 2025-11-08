// Insertar API: En base a lo que hizo Jairo
import { landingApi } from './api.js';

// Función simple para cargar datos
async function cargarDatos() {
    try {
        const datos = await landingApi.getData();
        console.log('Datos recibidos:', datos);
        
      
        document.querySelector('.hero-texto h1').textContent = datos.titulo;
        
    } catch (error) {
        console.log('Usando datos locales por ahora');
    }
}

// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', cargarDatos);


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
