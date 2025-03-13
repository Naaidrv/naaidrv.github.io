// Theme functions
function getPreferredTheme() {
    return localStorage.getItem('theme') || 'dark';
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Main initialization
document.addEventListener("DOMContentLoaded", function() {

    // Initialize theme
    const theme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);

    // Navigation elements
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".side-nav a");

    // Get current visible section
    function getCurrentSection() {
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const offset = viewportHeight * 0.4;

        let currentSection = null;
        let maxVisibility = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = rect.height;
            const visibleHeight = Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top);
            const visibilityRatio = visibleHeight / sectionHeight;

            if (visibilityRatio > maxVisibility) {
                maxVisibility = visibilityRatio;
                currentSection = section;
            }
        });

        return currentSection;
    }

    // Update active navigation
    function updateActiveNav() {
        const currentSection = getCurrentSection();
        
        if (!currentSection) return;

        const currentId = currentSection.id;
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            
            const href = link.getAttribute("href").substring(1);
            
            if ((currentId === "portfolio" || currentId === "portfolioM") && href === "portfolio") {
                link.classList.add("active");
            }
            else if (currentId === href) {
                link.classList.add("active");
            }
        });
    }

    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            const href = link.getAttribute("href");
            let targetSection;

            if (href === "#portfolio") {
                const desktopPortfolio = document.querySelector(".portfolio-section-desk");
                const mobilePortfolio = document.querySelector(".portfolio-section-mobile");
                targetSection = window.innerWidth > 768 ? desktopPortfolio : mobilePortfolio;
            } else {
                targetSection = document.querySelector(href);
            }

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
                navLinks.forEach(navLink => navLink.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });

        // Ejecutar cuando se haga scroll o se cambie el tamaño de la ventana
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("resize", updateActiveNav);

// Ejecutar una vez al cargar la página para marcar correctamente la sección activa
updateActiveNav();
            // MixItUp Configuration
    let mixer = null;

    function initMixer() {
        // Determinar qué grid está activo
        const isDesktop = window.innerWidth > 768;
        const container = isDesktop 
            ? document.querySelector(".portfolio-section-desk .port-grid")
            : document.querySelector(".portfolio-section-mobile .port-grid");

        if (!container) return;

        try {
            // Si ya existe una instancia, la destruimos
            if (mixer) {
                mixer.destroy();
            }

            // Crear nueva instancia
            mixer = mixitup(container, {
                animation: {
                    duration: 300,
                    nudge: false,
                    reverseOut: false,
                    effects: 'fade scale(0.5)'
                }
            });

            // Forzar un filtro 'all' inicial
            mixer.filter('all');

        } catch (error) {
            console.error('Error initializing mixer:', error);
        }
    }

    // Manejar los clicks en los filtros
    const filterButtons = document.querySelectorAll('.work__item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Si el mixer no existe o está roto, reinicializamos
            if (!mixer || !mixer.isMixing) {
                initMixer();
            }

            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active-work'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('active-work');

            // Obtener y aplicar el filtro
            const filterValue = this.getAttribute('data-filter');
            
            try {
                mixer.filter(filterValue);
            } catch (error) {
                console.error('Error applying filter:', error);
                // Reintentar inicialización
                initMixer();
                // Reintentar filtrado
                setTimeout(() => {
                    mixer && mixer.filter(filterValue);
                }, 100);
            }
        });
    });

    // Reinicializar en cambio de tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initMixer();
        }, 250);
    });

    // Inicialización inicial
    initMixer();

    // Agregar botón de reinicio manual (opcional, para debugging)
    const resetButton = document.createElement('button');
    resetButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; padding: 10px; display: none;';
    resetButton.textContent = 'Reset MixItUp';
    resetButton.onclick = initMixer;
    document.body.appendChild(resetButton);
});