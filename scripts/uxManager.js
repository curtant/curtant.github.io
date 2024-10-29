// uxManager.js
class UXManager {
    constructor() {
      this.initialized = false;
      this.activeClasses = ['info-img', 'info-title', 'info-badge', 'info-stars', 'info-date'];
    }
  
    init() {
      if (this.initialized) {
        this.destroy();
      }
  
      this.setupDetailsListeners();
      this.setupRainbowBorders();
      this.initialized = true;
    }
  
    destroy() {
      // Rimuove tutti i listener precedenti
      const details = document.querySelectorAll('details.card-info');
      details.forEach(detail => {
        detail.removeEventListener('click', this.handleDetailsClick);
      });
  
      // Rimuove la classe rainbow-border
      this.activeClasses.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
          element.classList.remove('rainbow-border');
        });
      });
  
      // Rimuove anche la classe dai details
      details.forEach(detail => {
        detail.classList.remove('rainbow-border');
      });
  
      this.initialized = false;
    }
  
    setupDetailsListeners() {
      const details = document.querySelectorAll('details.card-info');
      
      details.forEach(detail => {
        detail.addEventListener('click', (event) => {
          // Previene la propagazione dell'evento per evitare comportamenti indesiderati
          event.stopPropagation();
          
          // Se il details è già aperto, non fare nulla
          if (detail.hasAttribute('open')) {
            return;
          }
  
          // Chiude tutti gli altri details
          details.forEach(otherDetail => {
            if (otherDetail !== detail && otherDetail.hasAttribute('open')) {
              otherDetail.removeAttribute('open');
            }
          });
        });
      });
    }
  
    setupRainbowBorders() {
      const details = document.querySelectorAll('details.card-info');
      const exampleCard = document.getElementById('example-card');
      
      // Funzione per applicare l'effetto rainbow
      const applyRainbowEffect = (detail, summaryClass) => {
        // Rimuove prima tutti gli effetti rainbow e chiude tutti i details
        document.querySelectorAll('.rainbow-border').forEach(el => {
          el.classList.remove('rainbow-border');
        });
        details.forEach(d => {
          if (d !== detail) {
            d.removeAttribute('open');
          }
        });
  
        // Applica l'effetto al details
        detail.classList.add('rainbow-border');
        detail.setAttribute('open', '');
        
        // Applica l'effetto a tutti gli elementi corrispondenti in example-card
        if (exampleCard && summaryClass) {
          const matchingElements = exampleCard.querySelectorAll(`.${summaryClass}`);
          matchingElements.forEach(element => {
            element.classList.add('rainbow-border');
          });
        }
      };
  
      // Funzione per rimuovere l'effetto rainbow
      const removeRainbowEffect = (detail, summaryClass) => {
        detail.classList.remove('rainbow-border');
        detail.removeAttribute('open');
        
        if (exampleCard && summaryClass) {
          const matchingElements = exampleCard.querySelectorAll(`.${summaryClass}`);
          matchingElements.forEach(element => {
            element.classList.remove('rainbow-border');
          });
        }
      };
  
      // Listener per i details
      details.forEach(detail => {
        detail.addEventListener('toggle', () => {
          const isOpen = detail.hasAttribute('open');
          const summaryClass = detail.querySelector('summary').className;
          
          if (isOpen) {
            applyRainbowEffect(detail, summaryClass);
          } else {
            removeRainbowEffect(detail, summaryClass);
          }
        });
      });
  
      // Listener per gli elementi in example-card
      if (exampleCard) {
        this.activeClasses.forEach(className => {
          const elements = exampleCard.querySelectorAll(`.${className}`);
          elements.forEach(element => {
            element.addEventListener('click', () => {
              // Trova il details corrispondente
              const correspondingDetails = Array.from(details).find(detail => 
                detail.querySelector(`summary.${className}`)
              );
  
              if (correspondingDetails) {
                // Se il details corrispondente è già aperto, lo chiudiamo
                if (correspondingDetails.hasAttribute('open')) {
                  removeRainbowEffect(correspondingDetails, className);
                } else {
                  // Altrimenti lo apriamo
                  applyRainbowEffect(correspondingDetails, className);
                }
              }
            });
          });
        });
      }
    }
  }
  
  // Esporta un'istanza singleton
  export const uxManager = new UXManager();