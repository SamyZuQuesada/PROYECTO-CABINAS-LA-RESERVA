class PaisajeCarousel {
  constructor() {
    this.carrusel = document.getElementById('carrusel-paisaje');
    this.botonAtras = document.getElementById('botonAtras');
    this.botonAdelante = document.getElementById('botonAdelante');
    this.slides = this.carrusel.querySelectorAll('.slide_paisaje');
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;

    this.carrusel.style.width = `${this.totalSlides * 100}%`;

    this.init();
    this.updateCarrusel(); // posición inicial
  }

  init() {
    this.botonAdelante.addEventListener('click', () => this.nextSlide());
    this.botonAtras.addEventListener('click', () => this.prevSlide());

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarrusel();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarrusel(); // <- nombre correcto
  }

  updateCarrusel() {
    // Mueve 100/totalSlides % por índice
    const translateX = -(this.currentIndex * (100 / this.totalSlides));
    this.carrusel.style.transform = `translateX(${translateX}%)`; // <- backticks ✅
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PaisajeCarousel();
});
