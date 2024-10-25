// galleryManager.js

export const galleryManager = {
    async loadCategoryData(categoryName) {
        try {
            const response = await fetch(`data/cards/${categoryName}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Failed to load data for category ${categoryName}:`, error);
            return null;
        }
    },

    async loadAllCategories() {
        const categoryFiles = await this.getCategoryFiles();
        const categories = [];
        for (const file of categoryFiles) {
            const categoryName = file.replace('.json', '');
            const categoryData = await this.loadCategoryData(categoryName);
            if (categoryData) {
                categories.push(categoryData);
            }
        }
        return categories;
    },

    async getCategoryFiles() {
        // TODO prendere i dati da altrove
        return ['tax.json', 'art.json'];
    },

    generateCategoryHTML(category) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'gallery-category step';
        categoryDiv.dataset.galleryCategory = category.categoryName;

        category.projects.forEach(project => {
            categoryDiv.appendChild(this.generateCardHTML(project));
        });

        return categoryDiv;
    },

    generateCardHTML(project) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.cardCategory = project.cardCategory;

        card.innerHTML = `
      <a href="${project.imgLink}" target="_blank" rel="noopener" data-card-img="link">
        <img src="media/img/cards/${project.imgSrc}" alt="project-img" class="card-image" data-card-img="src">
      </a>
      <a href="${project.titleLink}" target="_blank" rel="noopener" data-card-title="link">
        <h3 class="card-title" data-card-title="text">${project.titleText}</h3>
      </a>
      <div class="card-stats">
        ${project.stats.map((stat, index) => `
          <div class="stat-row">
            <a href="${stat.link}" target="_blank" class="stat-badge" rel="noopener" data-card-stats="link">
              <img src="media/logos/svg/stats/${stat.logoSrc}" alt="stat-logo" data-card-stats="src">
              <span data-card-stats="${index + 1}">${stat.text}</span>
            </a>
            <img src="media/logos/svg/stars/star${stat.stars}.svg" alt="stars" class="stat-stars" data-card-stars="${stat.stars}">
          </div>
        `).join('')}
        <div class="stat-row">
        <span class="card-edition" data-gallery-category="${project.edition}">Edition: ${project.edition}</span>
        <span class="card-edition" data-gallery-category="${project.date}">Date: ${project.date}</span>
        </div>
    </div>
    `;

        return card;
    },

    async renderGallery(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id ${containerId} not found`);
            return;
        }

        const categories = await this.loadAllCategories();
        categories.forEach(category => {
            const categoryHTML = this.generateCategoryHTML(category);
            container.appendChild(categoryHTML);
        })
        //document.dispatchEvent(new Event('galleryRendered')); // evento 'galleryRendered' alla fine del rendering
    }
};