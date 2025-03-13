window.addEventListener("load", function () {
  console.log('i18next:', window.i18next);
  console.log('i18nextHttpBackend:', window.i18nextHttpBackend);

  if (!window.i18nextHttpBackend) {
    console.error('❌ Error: i18nextHttpBackend no está cargado.');
    return;
  }

  i18next
    .use(i18nextHttpBackend)
    .init({
      lng: 'es',
      fallbackLng: 'en',
      backend: {
        loadPath: '/locales/{{lng}}/translation.json',
      },
    })
    .then(() => {
      console.log('✅ i18next inicializado correctamente');
      updateContent();
    })
    .catch((err) => {
      console.error('❌ Error al inicializar i18next:', err);
    });
});


function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.innerHTML = ''; // Limpia el contenido previo
    element.innerHTML = i18next.t(key);
  });
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    updateContent();
  });
}

function toggleLanguage() {
  const langSwitch = document.querySelector('.lang-switch');
  const currentLanguage = i18next.language;
  const newLanguage = currentLanguage === 'en' ? 'es' : 'en';

  changeLanguage(newLanguage);

  // Asegurar que el botón muestre el idioma correcto después del cambio
  langSwitch.textContent = newLanguage === 'en' ? 'ES' : 'EN';
}

// Asegurar que el botón muestre el idioma correcto en la carga de la página
document.addEventListener("DOMContentLoaded", () => {
  const langSwitch = document.querySelector('.lang-switch');
  const currentLanguage = i18next.language;

  langSwitch.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
});
