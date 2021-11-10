class PhotographeProfil {
    constructor(photographe, idURL) {
        this.photographe = photographe;
        this.idPage = idURL;
    }

    createPhotographeProfil() {
        if(this.idPage == this.photographe.id) {
            let createur = document.createElement('article');
            let profilPhotographe = `
                <img class="img-photographe" id="profil-photo-photographe" src="ressources/img/Photographers_ID_Photos/${this.photographe.portrait}">
                <div id="profil-nom-contact-photographe">
                    <h1 class="nom-photographe">${this.photographe.name}</h1>
                    <button class="btn-contact" onclick="contact('${this.photographe.name}')">Contactez-moi</button>
                </div>
                <div>
                    <span class="lieu-photographe">${this.photographe.city}, ${this.photographe.country}</span>
                    <p class="description-photographe" id="profil-description-photographe">
                        ${this.photographe.tagline}
                    </p>
                </div>
                <div class="liste-filtres-photographe">
                    ${this.photographe.tags.map(tag =>
                        `<a class="lien-filtre" href="#" aria-label="${tag}"><span aria-hidden="true">#${tag}</span></a>`
                    ).join(" ")}
                </div>
            `;
            createur.innerHTML = profilPhotographe;
            return createur;
        } else {
            return "";
        }        
    }
}