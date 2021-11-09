class PhotographeLike {
    constructor(nbLikeTotal) {
        this.nbLikeTotal = nbLikeTotal;
    }

    createLikesProfil() {
        const createur = document.createElement('span');
            var profilPhotographe = `
                <span id="profil-likes-photographe">${this.nbLikeTotal}</span> ♥</span>
            `;
            createur.innerHTML = profilPhotographe;
            return createur;
    }

}