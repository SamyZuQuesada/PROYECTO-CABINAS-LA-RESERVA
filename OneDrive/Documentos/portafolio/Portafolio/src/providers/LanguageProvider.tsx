import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    
    // Home Page
    "home.title": "Hola, soy",
    "home.subtitle": "Desarrollador Full Stack",
    "home.description": "Transformo ideas en experiencias digitales excepcionales",
    "home.viewProjects": "Ver Proyectos",
    "home.contactMe": "Contactar",
    "home.whatIDo": "Lo Que Hago",
    "home.whatIDoDesc": "Me especializo en crear soluciones web completas, desde el concepto hasta el despliegue",
    "home.webDev": "Desarrollo Web",
    "home.webDevDesc": "Creación de aplicaciones web modernas con React, TypeScript y las últimas tecnologías.",
    "home.uiux": "Diseño UI/UX",
    "home.uiuxDesc": "Interfaces intuitivas y atractivas que mejoran la experiencia del usuario.",
    "home.optimization": "Optimización",
    "home.optimizationDesc": "Aplicaciones rápidas y eficientes con las mejores prácticas de rendimiento.",
    "home.cta": "¿Listo para trabajar juntos?",
    "home.ctaDesc": "Hagamos realidad tu próximo proyecto",
    "home.letsStart": "Empecemos",
    
    // About Page
    "about.title": "Sobre Mí",
    "about.subtitle": "Desarrollador apasionado por crear soluciones digitales innovadoras",
    "about.hello": "¡Hola! Soy Alex",
    "about.bio1": "Con más de 5 años de experiencia en el desarrollo web, me especializo en crear aplicaciones modernas y escalables que resuelven problemas reales.",
    "about.bio2": "Mi pasión es transformar ideas complejas en interfaces intuitivas y funcionales. Disfruto trabajando en equipo y aprendiendo nuevas tecnologías constantemente.",
    "about.bio3": "Cuando no estoy programando, me gusta contribuir a proyectos de código abierto, leer sobre las últimas tendencias en tecnología y compartir conocimiento con la comunidad.",
    "about.skills": "Habilidades Técnicas",
    "about.frontend": "Frontend",
    "about.backend": "Backend",
    "about.tools": "Herramientas",
    "about.experience": "Experiencia & Educación",
    "about.seniorDev": "Desarrollador Senior Full Stack",
    "about.seniorDevCompany": "Tech Solutions Inc.",
    "about.seniorDevPeriod": "2022 - Presente",
    "about.seniorDevDesc": "Liderando el desarrollo de aplicaciones web empresariales usando React y Node.js.",
    "about.frontendDev": "Desarrollador Frontend",
    "about.frontendDevCompany": "Digital Agency",
    "about.frontendDevPeriod": "2020 - 2022",
    "about.frontendDevDesc": "Creación de interfaces de usuario interactivas y responsivas para diversos clientes.",
    "about.degree": "Ingeniería en Sistemas",
    "about.degreeCompany": "Universidad Tecnológica",
    "about.degreePeriod": "2016 - 2020",
    "about.degreeDesc": "Especialización en desarrollo de software y arquitectura de sistemas.",
    
    // Projects Page
    "projects.title": "Mis Proyectos",
    "projects.subtitle": "Una colección de proyectos que he desarrollado, desde aplicaciones web hasta móviles",
    "projects.all": "Todos",
    "projects.web": "Web",
    "projects.mobile": "Móvil",
    "projects.fullstack": "Full Stack",
    "projects.code": "Código",
    "projects.demo": "Demo",
    "projects.noProjects": "No hay proyectos en esta categoría",
    "projects.ecommerce": "E-Commerce Platform",
    "projects.ecommerceDesc": "Plataforma completa de comercio electrónico con carrito de compras, pagos y gestión de inventario.",
    "projects.taskapp": "Task Management App",
    "projects.taskappDesc": "Aplicación móvil para gestión de tareas con sincronización en tiempo real y colaboración en equipo.",
    "projects.analytics": "Analytics Dashboard",
    "projects.analyticsDesc": "Dashboard interactivo para visualización de datos y análisis de métricas empresariales en tiempo real.",
    "projects.landing": "Cabañas La Reserva",
    "projects.landingDesc": "Landing page para descubrir y reservar cabañas en un entorno natural.",
    "projects.social": "Social Media Platform",
    "projects.socialDesc": "Red social con funciones de chat, publicaciones, likes, comentarios y sistema de seguidores.",
    "projects.fitness": "Fitness Tracking App",
    "projects.fitnessDesc": "Aplicación móvil para seguimiento de entrenamientos, nutrición y progreso fitness.",
    "projects.ai": "AI Content Generator",
    "projects.aiDesc": "Herramienta web que utiliza IA para generar contenido creativo y optimizado para SEO.",
    
    // Contact Page
    "contact.title": "Contacto",
    "contact.subtitle": "¿Tienes un proyecto en mente? Me encantaría escuchar sobre él",
    "contact.info": "Información de Contacto",
    "contact.infoDesc": "No dudes en contactarme a través de cualquiera de estos medios. Respondo en menos de 24 horas.",
    "contact.email": "Email",
    "contact.phone": "Teléfono",
    "contact.location": "Ubicación",
    "contact.locationValue": "Ciudad de México, México",
    "contact.callCta": "¿Prefieres una llamada?",
    "contact.callCtaDesc": "Agenda una videollamada gratuita de 30 minutos para discutir tu proyecto.",
    "contact.scheduleCall": "Agendar Llamada",
    "contact.name": "Nombre",
    "contact.namePlaceholder": "Tu nombre",
    "contact.emailPlaceholder": "tu@email.com",
    "contact.subject": "Asunto",
    "contact.subjectPlaceholder": "¿De qué se trata tu proyecto?",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Cuéntame más sobre tu proyecto...",
    "contact.send": "Enviar Mensaje",
    "contact.responseTime": "Tiempo de Respuesta",
    "contact.responseTimeDesc": "Normalmente respondo en menos de 24 horas durante días laborables. Si tu proyecto es urgente, por favor indícalo en el mensaje.",
    "contact.success": "¡Mensaje enviado!",
    "contact.successDesc": "Te responderé lo antes posible.",
    
    // Footer
    "footer.rights": "Todos los derechos reservados.",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    
    // Home Page
    "home.title": "Hi, I'm",
    "home.subtitle": "Full Stack Developer",
    "home.description": "Transforming ideas into exceptional digital experiences",
    "home.viewProjects": "View Projects",
    "home.contactMe": "Contact",
    "home.whatIDo": "What I Do",
    "home.whatIDoDesc": "I specialize in creating complete web solutions, from concept to deployment",
    "home.webDev": "Web Development",
    "home.webDevDesc": "Creating modern web applications with React, TypeScript and the latest technologies.",
    "home.uiux": "UI/UX Design",
    "home.uiuxDesc": "Intuitive and attractive interfaces that enhance the user experience.",
    "home.optimization": "Optimization",
    "home.optimizationDesc": "Fast and efficient applications with performance best practices.",
    "home.cta": "Ready to work together?",
    "home.ctaDesc": "Let's make your next project a reality",
    "home.letsStart": "Let's Start",
    
    // About Page
    "about.title": "About Me",
    "about.subtitle": "Developer passionate about creating innovative digital solutions",
    "about.hello": "Hi! I'm Alex",
    "about.bio1": "With over 5 years of experience in web development, I specialize in creating modern and scalable applications that solve real problems.",
    "about.bio2": "My passion is transforming complex ideas into intuitive and functional interfaces. I enjoy working in teams and constantly learning new technologies.",
    "about.bio3": "When I'm not coding, I like to contribute to open source projects, read about the latest technology trends, and share knowledge with the community.",
    "about.skills": "Technical Skills",
    "about.frontend": "Frontend",
    "about.backend": "Backend",
    "about.tools": "Tools",
    "about.experience": "Experience & Education",
    "about.seniorDev": "Senior Full Stack Developer",
    "about.seniorDevCompany": "Tech Solutions Inc.",
    "about.seniorDevPeriod": "2022 - Present",
    "about.seniorDevDesc": "Leading the development of enterprise web applications using React and Node.js.",
    "about.frontendDev": "Frontend Developer",
    "about.frontendDevCompany": "Digital Agency",
    "about.frontendDevPeriod": "2020 - 2022",
    "about.frontendDevDesc": "Creating interactive and responsive user interfaces for various clients.",
    "about.degree": "Systems Engineering",
    "about.degreeCompany": "Technology University",
    "about.degreePeriod": "2016 - 2020",
    "about.degreeDesc": "Specialization in software development and systems architecture.",
    
    // Projects Page
    "projects.title": "My Projects",
    "projects.subtitle": "A collection of projects I've developed, from web to mobile applications",
    "projects.all": "All",
    "projects.web": "Web",
    "projects.mobile": "Mobile",
    "projects.fullstack": "Full Stack",
    "projects.code": "Code",
    "projects.demo": "Demo",
    "projects.noProjects": "No projects in this category",
    "projects.ecommerce": "E-Commerce Platform",
    "projects.ecommerceDesc": "Complete e-commerce platform with shopping cart, payments and inventory management.",
    "projects.taskapp": "Task Management App",
    "projects.taskappDesc": "Mobile application for task management with real-time sync and team collaboration.",
    "projects.analytics": "Analytics Dashboard",
    "projects.analyticsDesc": "Interactive dashboard for data visualization and real-time business metrics analysis.",
    "projects.landing": "Cabañas La Reserva",
    "projects.landingDesc": "Landing page for discovering and booking cabins in a natural setting.",
    "projects.social": "Social Media Platform",
    "projects.socialDesc": "Social network with chat, posts, likes, comments and follower system features.",
    "projects.fitness": "Fitness Tracking App",
    "projects.fitnessDesc": "Mobile application for tracking workouts, nutrition and fitness progress.",
    "projects.ai": "AI Content Generator",
    "projects.aiDesc": "Web tool that uses AI to generate creative and SEO-optimized content.",
    
    // Contact Page
    "contact.title": "Contact",
    "contact.subtitle": "Have a project in mind? I'd love to hear about it",
    "contact.info": "Contact Information",
    "contact.infoDesc": "Feel free to contact me through any of these means. I respond within 24 hours.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.locationValue": "Mexico City, Mexico",
    "contact.callCta": "Prefer a call?",
    "contact.callCtaDesc": "Schedule a free 30-minute video call to discuss your project.",
    "contact.scheduleCall": "Schedule Call",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "you@email.com",
    "contact.subject": "Subject",
    "contact.subjectPlaceholder": "What is your project about?",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me more about your project...",
    "contact.send": "Send Message",
    "contact.responseTime": "Response Time",
    "contact.responseTimeDesc": "I usually respond within 24 hours on business days. If your project is urgent, please indicate it in the message.",
    "contact.success": "Message sent!",
    "contact.successDesc": "I'll get back to you as soon as possible.",
    
    // Footer
    "footer.rights": "All rights reserved.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
