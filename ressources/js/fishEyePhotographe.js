/** Récupère le photographe en question **/
const InfosPhotographe = function (name, portrait, city, country, tagline, tags) {
    let infosPhotographe = {};
    
    infosPhotographe.name = name;
    infosPhotographe.portrait = portrait;
    infosPhotographe.city = city;
    infosPhotographe.country = country;
    infosPhotographe.tagline = tagline;
    infosPhotographe.tags = tags;
    
    infosPhotographe.construct = function () {
        return `
            <img class="img-photographe" id="profil-photo-photographe" src="ressources/img/Photographers_ID_Photos/${portrait}">
            <div id="profil-nom-contact-photographe">
                <h1 class="nom-photographe">${name}</h1>
                <button class="btn-contact">Contactez-moi</button>
            </div>
            <div>
                <span class="lieu-photographe">${city}, ${country}</span>
                <p class="description-photographe" id="profil-description-photographe">
                    ${tagline}
                </p>
            </div>
            <div class="liste-filtres-photographe">
                ${tags.map(tag =>
                    `<a class="lien-filtre" href="#" aria-label="${tag}"><span aria-hidden="true">#${tag}</span></a>`
                ).join(" ")}
            </div>
        `;
    };
    return infosPhotographe;
}


/** Gestion du JSON **/
fetch('ressources/js/FishEyeData.json').then(response => {
    return response.json();
}).then(data => {
    var idURL = new URL(window.location.href).searchParams.get("id");
    for (var nbPhotographe = 0; nbPhotographe < data["photographers"].length; nbPhotographe++) {
        let photographe = data["photographers"][nbPhotographe]["id"];
        if(photographe == idURL) {
            var numPhotographe = nbPhotographe;
        }
    }
    let photographe = data["photographers"][numPhotographe];
    let infosPhotographeDOM = InfosPhotographe(photographe.name, photographe.portrait, photographe.city, photographe.country, photographe.tagline, photographe.tags);
    infosPhotographeDOM = infosPhotographeDOM.construct();
    document.getElementById('profil-infos-photographe').insertAdjacentHTML('beforeend', infosPhotographeDOM);
    /*document.getElementById('liste-photos').insertAdjacentHTML('beforeend', liste-photos);
    document.getElementById('likes-tarif').insertAdjacentHTML('beforeend', likes-tarif);*/
}).catch(err => {});