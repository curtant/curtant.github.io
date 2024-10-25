// uiManager.js


export const uiManager = {
  init(localizationManager) {
    this.setupLanguageDropdown(localizationManager);
    this.setupTooltips();
    this.setupThemeToggle();
    this.setupContactModal();
  },

  setupLanguageDropdown(localizationManager) {
    const dropdownButton = document.getElementById('language-dropdown-button');
    const dropdown = document.getElementById('language-dropdown-list');

    dropdownButton.addEventListener('click', () => this.toggleDropdown(dropdown));

    document.querySelectorAll('#language-dropdown-list a[data-lang]').forEach(link => {
      link.addEventListener('click', async (event) => {
        event.preventDefault();
        await localizationManager.changeLanguage(link.getAttribute('data-lang'));
        this.updateLanguageUI(localizationManager.currentLanguage);
        this.closeDropdown(dropdown);
      });
    });

    document.addEventListener('click', (event) => {
      if (!dropdownButton.contains(event.target) && !dropdown.contains(event.target)) {
        this.closeDropdown(dropdown);
      }
    });
  },

  updateLanguageUI(lang) {
    const currentIcon = document.getElementById('language-dropdown-button');
    const selectedLang = document.getElementById(`lang-${lang}`);
    if (currentIcon && selectedLang) {
      const selectedIcon = selectedLang.querySelector('img');
      if (selectedIcon) {
        currentIcon.src = selectedIcon.src;
        currentIcon.alt = selectedIcon.alt;
      }
    }
  },

  setupContactModal() {
    const modal = document.getElementById("contactModal");
    const closeBtn = document.querySelector(".close");

    function openModal() {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }

    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('form-button')) {
        openModal();
      }
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
      }
    });

    // Aggiorna la gestione del click sul tooltip del CV
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('cv-tooltip-button')) {
        openModal();
      }
    });
  },

  setupTooltips() {
    const cvTooltipContainer = document.querySelector('.cv-tooltip-container');
    const cvTooltip = cvTooltipContainer.querySelector('.cv-tooltip');
    const cvImage = document.getElementById('cv');

    cvImage.addEventListener('click', (event) => {
      event.preventDefault();
      cvTooltip.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
      if (!cvTooltipContainer.contains(event.target)) {
        cvTooltip.classList.remove('show');
      }
    });
  },

  toggleDropdown(dropdown) {
    dropdown.classList.toggle('show');
    dropdown.style.display = dropdown.classList.contains('show') ? 'block' : 'none';
  },

  closeDropdown(dropdown) {
    dropdown.classList.remove('show');
    dropdown.style.display = 'none';
  },

  setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Funzione per impostare il tema
    const setTheme = (theme) => {
      if (theme === 'dark') {
        body.classList.add('night-mode');
        localStorage.setItem('theme', 'night');
      } else {
        body.classList.remove('night-mode');
        localStorage.setItem('theme', 'light');
      }
    };

    // Controlla prima la preferenza salvata, poi la preferenza di sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'night' ? 'dark' : 'light');
    } else if (prefersDarkScheme.matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    // Aggiungi l'event listener solo se l'elemento esiste
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        if (body.classList.contains('night-mode')) {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      });
    } else {
      console.error("Elemento .theme-toggle non trovato");
    }
  },
};