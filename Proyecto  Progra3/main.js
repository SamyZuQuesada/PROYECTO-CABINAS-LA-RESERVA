import { landingApi, testimoniosApi } from './api.js';

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

async function cargarTestimonios() {
    try {
        const testimonios = await testimoniosApi.getTestimonios();
        const container = document.getElementById('testimonios-container');
        
        if (!container) return;
        
        if (testimonios && testimonios.length > 0) {
            container.innerHTML = testimonios.map(testimonio => `
                <article class="testimonio-card">
                    <div class="testimonio-header">
                        <div class="cliente-avatar">${getIniciales(testimonio.name)}</div>
                        <div class="cliente-info">
                            <h4>${testimonio.name}</h4>
                        </div>
                    </div>
                    <p class="testimonio-texto">"${testimonio.description}"</p>
                    <div class="testimonio-fecha">${formatearFecha(testimonio.date)}</div>
                </article>
            `).join('');
        } else {
            container.innerHTML = '<p>No hay testimonios disponibles</p>';
        }
    } catch (error) {
        const container = document.getElementById('testimonios-container');
        if (container) {
            container.innerHTML = '<p>Error cargando testimonios</p>';
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    cargarTestimonios();
});


const carrusel = document.getElementById("carrusel-servicio")
const slides = document.querySelectorAll(".slide_Servicio")
const dotsContainer = document.getElementById("dots")
const btnAtras = document.getElementById("botonAtrasSer")
const btnAdelante = document.getElementById("botonAdelanteSer")

let indiceActual = 0
const totalSlides = slides.length

// Crear dots
if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, index) => {
        const dot = document.createElement("button")
        dot.setAttribute("aria-label", `Ir a slide ${index + 1}`)
        dot.setAttribute("aria-current", index === 0 ? "true" : "false")
        dot.addEventListener("click", () => irASlide(index))
        dotsContainer.appendChild(dot)
    })
}

const dots = dotsContainer ? dotsContainer.querySelectorAll("button") : []

function actualizarCarrusel() {
    if (carrusel) {
        carrusel.style.transform = `translateX(-${indiceActual * 100}%)`
    }
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

if (btnAdelante) btnAdelante.addEventListener("click", siguiente)
if (btnAtras) btnAtras.addEventListener("click", anterior)

// Auto-play (opcional)
if (slides.length > 0) {
    setInterval(siguiente, 5000)
}


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


window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none"
        document.body.style.overflow = "auto"
    }
})


document.querySelectorAll(".opciones a").forEach((link) => {
    link.addEventListener("click", () => {
        const navToggle = document.getElementById("navToggle")
        if (navToggle) {
            navToggle.checked = false
        }
    })
})

// 🔹 SCROLL ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
        }
    })
}, observerOptions)


document.addEventListener("DOMContentLoaded", () => {
    const animateElements = document.querySelectorAll(".scroll-animate, .scroll-animate-stagger")
    animateElements.forEach((el) => observer.observe(el))
})


let index = 0;
const imgs = document.querySelectorAll('.slider img');

function showNext() {
    if (imgs.length > 0) {
        imgs[index].classList.remove('active');
        index = (index + 1) % imgs.length;
        imgs[index].classList.add('active');
    }
}

if (imgs.length > 0) {
    setInterval(showNext, 4000);
}

document.addEventListener('DOMContentLoaded', function() {
    cargarTestimonios();
});
