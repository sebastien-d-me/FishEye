class PhotographesCarte {
    constructor(photographe) {
        this.photographe = photographe;
    }

    createPhotographeCarte() {
        const createur = document.createElement('article');
        createur.classList.add("photographe");

        this.photographe.tags.forEach(tag => createur.classList.add(tag));

        const profilPhotographe = `
            <a class="lien-photographe" href="photographe.html?id=${this.photographe.id}" aria-label="${this.photographe.name}">
                <img alt="" class="img-photographe" src="ressources/img/Photographers_ID_Photos/${this.photographe.portrait}">
                <h2 class="nom-photographe">${this.photographe.name}</h2>
            </a>
            <span class="lieu-photographe">${this.photographe.city}, ${this.photographe.country}</span>
            <p class="description-photographe">
                ${this.photographe.tagline}
                    <br>
                <span class="tarif-photographe">${this.photographe.price}€ / Jour</span>
            </p>
            <div class="liste-filtres-photographe">
                ${this.photographe.tags.map(tag =>
                    `<a class="lien-filtre" href="#" aria-label="${tag}"><span aria-hidden="true">#${tag}</span></a>`
                ).join(" ")}
            </div>
        `;
        
        createur.innerHTML = profilPhotographe;
        return createur;
    }
}