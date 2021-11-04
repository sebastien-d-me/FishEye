/** Retour au contenu **/
window.onscroll = function() {
    if (window.scrollY != 0) {
        document.getElementById("retour-contenu").style.display = "block";
    } else {
        document.getElementById("retour-contenu").style.display = "none";
    }
}

/** Liste des photographes **/
const Photographe = function (id, name, portrait, city, country, tagline, price, tags) {
    let photographe = {};

    photographe.id = id;
    photographe.name = name;
    photographe.portrait = portrait;
    photographe.city = city;
    photographe.country = country;
    photographe.tagline = tagline;
    photographe.price = price;
    photographe.tags = tags;

    photographe.construct = function () {
            return `
                <article class="photographe ${tags.map(tag =>`${tag}`).join(" ")}">
                    <a class="lien-photographe" href="photographe.html?id=${id}" aria-label="${name}">
                    <img alt="" class="img-photographe" src="ressources/img/Photographers_ID_Photos/${portrait}">
                        <h2 class="nom-photographe">${name}</h2>
                    </a>
                    <span class="lieu-photographe">${city}, ${country}</span>
                    <p class="description-photographe">
                        ${tagline}
                            <br>
                        <span class="tarif-photographe">${price}€ / Jour</span>
                    </p>
                    <div class="liste-filtres-photographe">
                        ${tags.map(tag =>
                            `<a class="lien-filtre" href="#" aria-label="${tag}"><span aria-hidden="true">#${tag}</span></a>`
                        ).join(" ")}
                    </div>
                </article>
            `;
    };
    return photographe;
};

/** Gère les filtres **/
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

/** Gestion du JSON **/
fetch('ressources/js/FishEyeData.json').then(response => {
    return response.json();
}).then(data => {
    for (var nbPhotographe = 0; nbPhotographe < data["photographers"].length; nbPhotographe++) {
        let photographe = data["photographers"][nbPhotographe];
        let photographeDOM = Photographe(photographe.id, photographe.name, photographe.portrait, photographe.city, photographe.country, photographe.tagline, photographe.price, photographe.tags);
        photographeDOM = photographeDOM.construct();
        document.getElementById('liste-photographes').insertAdjacentHTML('beforeend', photographeDOM);
    }
}).catch(err => {});