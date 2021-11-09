class Accueil {
    constructor() {
        this.listePhotographes = document.querySelector('#liste-photographes');
        
        this.photographesApi = new PhotographeApi('ressources/data/FishEyeData.json');
    }

    async main() {
        /** Système de retour au contenu **/
        window.onscroll = function() {
            if (window.scrollY != 0) {
                document.getElementById("retour-contenu").style.display = "block";
            } else {
                document.getElementById("retour-contenu").style.display = "none";
            }
        }

        const photographesData = await this.photographesApi.getPhotographes();
        const Photographe = photographesData.map(photographe => new PhotographesFactory(photographe));

        Photographe.forEach(photographe => {
            const CarteTemplate = new PhotographesCarte(photographe);
            this.listePhotographes.appendChild(
                CarteTemplate.createPhotographeCarte()
            );
        })
    }
}

const accueil = new Accueil();
accueil.main()

/** Système de filtres **/
function filtres(type) {
    let photographe = document.querySelectorAll(".photographe");
    photographe.forEach(function(photographe) {
        photographe.style.display = "none";
    });
    let filtrePhotographe = document.querySelectorAll("."+type);
    filtrePhotographe.forEach(function(filtrePhotographe) {
        filtrePhotographe.style.display = "block";
    });
}

