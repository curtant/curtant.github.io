// localizationManager.js
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

// Configura marked per gestire correttamente gli apostrofi e il testo
marked.setOptions({
    smartypants: false,  // Disabilita la conversione degli apostrofi in "smart quotes"
    gfm: true,          // Usa GitHub Flavored Markdown
    breaks: true,       // Converte i line breaks in <br>
    mangle: false,      // Previene la modifica di testo che potrebbe sembrare HTML
    headerIds: false    // Disabilita la generazione automatica di ID per gli headers
});

export const localizationManager = {
    currentLanguage: 'it',
    translations: {},
    markdownCache: {},

    async loadTranslations(lang) {
        try {
            const response = await fetch(`data/translations/${lang}.json`);
            this.translations = await response.json();
            this.currentLanguage = lang;
            localStorage.setItem('selectedLanguage', lang);
            localStorage.setItem(`translations_${lang}`, JSON.stringify(this.translations));
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to cached translations if available
            const cachedTranslations = localStorage.getItem(`translations_${lang}`);
            if (cachedTranslations) {
                this.translations = JSON.parse(cachedTranslations);
                this.currentLanguage = lang;
            }
        }
    },

    async changeLanguage(lang) {
        await this.loadTranslations(lang);
        document.documentElement.lang = lang;
        this.updateTranslations();
    },

    getTranslation(key) {
        return this.getNestedTranslation(this.translations, key);
    },

    getNestedTranslation(obj, path) {
        const keys = path.split('.');
        return keys.reduce((acc, key) => {
            if (acc && typeof acc === 'object' && key in acc) {
                return acc[key];
            }
            return undefined;
        }, obj);
    },

    async updateTranslations() {
        const elements = document.querySelectorAll('[data-translate-key]');
        for (const element of elements) {
            const key = element.getAttribute('data-translate-key');
            const translation = this.getTranslation(key);

            if (typeof translation === 'object' && translation.src) {
                // Complex content with Markdown source
                let markdown = await this.loadMarkdown(translation.src);
                
                // Check if we need to parse the template
                if (element.id && element.id.endsWith('.parse')) {
                    markdown = this.parseTemplate(markdown);
                }
                
                element.innerHTML = marked(markdown);
            } else if (typeof translation === 'string') {
                if (element.id && element.id.endsWith('.parse')) {
                    element.innerHTML = this.parseTemplate(translation);
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn(`Invalid translation for key: ${key}`);
            }
        }
    },

    async loadMarkdown(src) {
        if (this.markdownCache[src]) {
            return this.markdownCache[src];
        }
        try {
            const response = await fetch(src);
            const markdown = await response.text();
            this.markdownCache[src] = markdown;
            return markdown;
        } catch (error) {
            console.error(`Error loading Markdown from ${src}:`, error);
            return '';
        }
    },

    parseTemplate(template) {
        if (typeof template !== 'string') {
            console.warn(`Invalid template for parsing: ${template}`);
            return '';
        }
        const regex = /{{id\|(.*?)}}/g;
        return template.replace(regex, (match, id) => {
            switch (id) {
                case 'form-button':
                    return `<span id="form-button" data-translate-key="nav.form-button" class="form-button cv-tooltip-form-button">${this.getTranslation('nav.form-button')}</span>`;
                // Altri casi secondo necessità
                default:
                    console.warn(`Unknown id in template: ${id}`);
                    return match;
            }
        });
    }
};