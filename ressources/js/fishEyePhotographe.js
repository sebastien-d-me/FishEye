/** Récupère les infos du photographe en question **/
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

/** Affiche les photos **/
const AffichePhotos = function (id, title, nom, typePhoto, nomPhoto, tags, likes, date, price) {
    let affichePhotos = {};
    
    affichePhotos.id = id;
    affichePhotos.title = title;
    affichePhotos.nom = nom;
    affichePhotos.typePhoto = typePhoto;
    affichePhotos.nomPhoto = nomPhoto;
    affichePhotos.tags = tags;
    affichePhotos.likes = likes;
    affichePhotos.date = date;
    affichePhotos.price = price;
    
    if(typePhoto == "image") {
        affichePhotos.construct = function () {
            return `
                <div class="photo">
                    <img class="img-photo" src="ressources/img/${nom}/${nomPhoto}">
                    <div>
                        <span class="titre-photo">${title}</span>
                        <span class="like">
                            ${likes} 
                            <span class="like-coeur">♥</span>
                        </span>
                    </div>
                </div>
            `;
        };
    } else {
        affichePhotos.construct = function () {
            return `
                <div class="photo">
                    <video controls class="img-photo">
                        <source src="ressources/img/${nom}/${nomPhoto}" type="video/mp4">
                    </video>
                    <div>
                        <span class="titre-photo">${title}</span>
                        <span class="like">
                            ${likes} 
                            <span class="like-coeur">♥</span>
                        </span>
                    </div>
                </div>
            `;
        };
    }
    return affichePhotos;
}

/** Récupère le nombre de likes total et du tarif **/
const LikeTarif = function (likeTotal, price) {
    let likeTarif = {};
    
    likeTarif.likeTotal = likeTotal;
    likeTarif.price = price;
    
    likeTarif.construct = function () {
        return `
            <span id="profil-likes-photographe">${likeTotal} ♥</span>
            <span id="profil-tarif-photographe">${price}€ / jour</span>
        `;
    };
    return likeTarif;
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
    var likeTotal = 0;
    /** Infos du photographe **/
    let infosPhotographeDOM = InfosPhotographe(photographe.name, photographe.portrait, photographe.city, photographe.country, photographe.tagline, photographe.tags);
    infosPhotographeDOM = infosPhotographeDOM.construct();
    document.getElementById('profil-infos-photographe').insertAdjacentHTML('beforeend', infosPhotographeDOM);
    /** Récupère les photos du photographe **/
    var nomPhotographe = "";
    switch(idURL) {
        case "243":
            nomPhotographe = "Mimi";
            break;
        case "930":
            nomPhotographe = "Ellie_Rose";
            break;    
        case "82":
            nomPhotographe = "Tracy";
            break;
        case "527":
            nomPhotographe = "Nabeel";
            break;
        case "925":
            nomPhotographe = "Rhode";
            break;    
        case "195":
            nomPhotographe = "Marcel";
            break;
        default:
            break;
    }
    var typePhoto = "";
    var nomPhoto = "";
    for(var nbPhoto = 0; nbPhoto < data["media"].length; nbPhoto++) {
        if(data["media"][nbPhoto]["photographerId"] == idURL) {
            let photos = data["media"][nbPhoto];
            likeTotal = likeTotal + photos["likes"];
            if(photos["image"] === undefined) {
                typePhoto = "video";
                nomPhoto = photos["video"];
            } else {
                typePhoto = "image";
                nomPhoto = photos["image"];
            }
            let photosDOM = AffichePhotos(photos["id"], photos["title"], nomPhotographe, typePhoto, nomPhoto, photos["tags"], photos["likes"], photos["date"], photos["price"]);
            photosDOM = photosDOM.construct();
            document.getElementById('profil-liste-photos').insertAdjacentHTML('beforeend', photosDOM);
        }
    }
    /** Likes et tarif du photographe **/
    let likesTarifDOM = LikeTarif(likeTotal, photographe.price);
    likesTarifDOM = likesTarifDOM.construct();
    document.getElementById('profil-likes-tarif').insertAdjacentHTML('beforeend', likesTarifDOM);
}).catch(err => {});