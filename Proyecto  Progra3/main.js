class PaisajeCarousel {
  constructor() {
    this.carrusel = document.getElementById('carrusel-paisaje');
    this.botonAtras = document.getElementById('botonAtras');
    this.botonAdelante = document.getElementById('botonAdelante');
    this.slides = this.carrusel.querySelectorAll('.slide_paisaje');
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;

    this.init();
    this.updateCarrusel();
  }

  init() {
    this.botonAdelante.addEventListener('click', () => this.nextSlide());
    this.botonAtras.addEventListener('click', () => this.prevSlide());

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
    this.updateCarrusel(); 
  }

  updateCarrusel() {
    const translateX = -(this.currentIndex * (100 / this.totalSlides));
    this.carrusel.style.transform = `translateX(${translateX}%)`; 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PaisajeCarousel();
});


class ServicioCarusel {
  constructor() {
    this.carrusel = document.getElementById('carrusel-servicio');
    this.botonAtras = document.getElementById('botonAtrasSer');
    this.botonAdelante = document.getElementById('botonAdelanteSer');
    this.slides = this.carrusel ? this.carrusel.querySelectorAll('.slide_Servicio') : [];

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;

    this.init();
    this.updateCarrusel();
  }

  init() {
    this.botonAdelante.addEventListener('click', () => this.nextSlide());
    this.botonAtras.addEventListener('click', () => this.prevSlide());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    window.addEventListener('resize', () => this.updateCarrusel());
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarrusel();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarrusel();
  }

  updateCarrusel() {
    // Mueve el elide
    const translateX = -(this.currentIndex * 100);
    this.carrusel.style.transform = `translateX(${translateX}%)`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ServicioCarusel();
});