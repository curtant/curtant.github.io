// app.js
import { localizationManager } from './scripts/localizationManager.js';
import { uiManager } from './scripts/uiManager.js';
import { galleryManager } from './scripts/galleryManager.js';
import { animationManager } from './scripts/animationManager.js';

document.addEventListener('DOMContentLoaded', async () => {
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'it';
  await localizationManager.loadTranslations(savedLanguage);
  await localizationManager.updateTranslations();

  // Inizializza uiManager dopo che le traduzioni sono state applicate
  uiManager.init(localizationManager);
  uiManager.updateLanguageUI(savedLanguage);

  // Render the gallery
  await galleryManager.renderGallery('gallery-container');

  await localizationManager.updateTranslations();

  // Aggiungiamo un piccolo ritardo per assicurarci che il DOM sia completamente aggiornato
  setTimeout(() => {
    animationManager.init();
  }, 100);
});
