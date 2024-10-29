# Portfolio Personale

Benvenuto nel mio portfolio personale!
Questo spazio rappresenta il mio viaggio nel mondo dello sviluppo, dove ogni progetto racconta una storia di apprendimento, divertimento e crescita.

## 🚀 Overview

Un portfolio web interattivo che combina design moderno e funzionalità tecniche avanzate.
Progettato per essere non solo una vetrina dei miei progetti, ma anche un'esperienza utente coinvolgente e personalizzabile.

## 💭 Filosofia di Sviluppo

Questo portfolio è stato sviluppato intenzionalmente con JavaScript vanilla e gestione dati lato client, evitando framework moderni e librerie.
Questa scelta, anche se non ottimale per la produzione, riflette il vero scopo del progetto: l'esplorazione e l'apprendimento.

### Perché Questa Scelta?

- **Esplorazione Tecnica**: Ho sperimentato diversi approcci, privilegiando l'apprendimento rispetto all'uniformità del codice
- **Comprensione Profonda**: Lavorare nativamente ha approfondito la mia comprensione dei meccanismi web fondamentali
- **Client-Side**: La gestione dati lato client, seppur non sempre ottimale, mi ha permesso di esplorare pattern e gestione stato

Nonostante l'approccio sperimentale nella scrittura del codice, ho mantenuto come priorità la coerenza dell'interfaccia utente e la qualità dell'esperienza finale.

## 📂 Struttura del Progetto

```bash
portfolio/
├── css/                    # Stili modulari
│   ├── variables.css        # Variabili CSS globali
│   ├── base.css             # Stili di base
│   ├── animate.css          # Animazioni
│   ├── card-example.css     # Stili per esempio 
│   ├── cards-galleries.css  # Stili per le gallerie
│   ├── components.css       # Componenti varii
│   ├── hidden-utilities.css # Componenti nascosti
│   ├── media-queries.css    # Responsive design
│   └── night-theme.css      # Tema scuro
├── scripts/                   # Logica JavaScript
│   ├── localizationManager.js  # Gestione multilingua
│   ├── animationManager.js     # Gestione animazioni Lottie
│   ├── galleryManager.js       # Gestione galleria progetti
│   ├── uiManager.js            # Gestione interfaccia
│   └── uxManager.js            # Gestione esperienza
├── data/                # Contenuti e traduzioni
│   ├── translations/     # JSON localizzazioni (it.json, en.json, cn.json)
│   ├── cards/            # Dati progetti (tax.json, art.json)
│   └── markdown/         # Contenuti in formato MD
├── media/           # Assets multimediali
│   ├── logos/        # Loghi e icone
│   ├── img/          # Immagini
│   └── lottie/       # File animazioni
├── app.js        # Entry point JS
├── main.css      # Entry point CSS
└── index.html    # Entry point HTML
```

## ✨ Caratteristiche Principali

- **Supporto Multilingua** 
  - Italiano 🇮🇹
  - English 🇺🇸
  - 中文 🇨🇳

`localizationManager.js` gestisce in modo dinamico le traduzioni, caricandone la struttura dalla directory [`data/translations`](data/translations) e consentendo un controllo preciso sulle scelte espressive tramite i file `markdown`, invece di affidarsi alla traduzione automatica.

- **Galleria Progetti Interattiva**
  - Cards animate con dettagli tecnici
  - Sistema di valutazione con stelle
  - Collegamenti diretti a demo e codice
  
`galleryManager.js` gestisce dinamicamente le gallerie, caricandole dalla directory [`data/cards`](data/cards) e facilitando modifiche o aggiunte di nuove categorie tramite i file `categorie.json`.

- **Design Responsivo**
  - Layout adattivo per ogni dispositivo
  - Tema chiaro/scuro personalizzabile
  - Animazioni fluide e interattive

## 🛠️ Tech Stack

### Frontend

- JavaScript (ES6+)
- HTML5 & CSS3
- Lottie Animations

### Stile e Design

- CSS Modules & Custom Properties
- Media Queries Responsive
- Animazioni personalizzate

### Tools & Utilities

- Sistema di tooltip informativi
- Modal per contatti integrato
- Caricamento asincrono dei contenuti

---

Creato con ❤️ da curtant