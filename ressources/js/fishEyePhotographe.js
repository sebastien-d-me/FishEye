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
const AffichePhotos = function (indexPhoto, id, title, nom, typePhoto, nomPhoto, tags, likes, date, price) {
    let affichePhotos = {};
    
    affichePhotos.indexPhoto = indexPhoto;
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
                <div class="photo" id="${id}">
                    <a href="#" onclick="ouvreLightbox(${indexPhoto}, 'ressources/img/${nom}/${nomPhoto}', '${title}')">
                        <img class="img-photo src-contenu" src="ressources/img/${nom}/${nomPhoto}">
                    </a>
                    <div>
                        <span class="titre-photo">${title}</span>
                        <span class="like like-${id}">
                            <span id="like-${id}">${likes}</span>
                            <span class="like-coeur" onclick="like('${id}')">♥</span>
                        </span>
                    </div>
                </div>
            `;
        };
    } else {
        affichePhotos.construct = function () {
            return `
                <div class="photo" id="${id}">
                    <a href="#" onclick="ouvreLightbox(${indexPhoto}, 'ressources/img/${nom}/${nomPhoto}', '${title}')">
                        <video controls class="img-photo">
                            <source class="src-contenu" src="ressources/img/${nom}/${nomPhoto}" type="video/mp4">
                        </video>
                    </a>
                    <div class="block-photo">
                        <span class="titre-photo">${title}</span>
                        <span class="like like-${id}">
                        <span id="like-${id}">${likes}</span> 
                            <span class="like-coeur" onclick="like('${id}')">♥</span>
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
            <span><span id="profil-likes-photographe">${likeTotal}</span> ♥</span>
            <span id="profil-tarif-photographe">${price}€ / jour</span>
        `;
    };
    return likeTarif;
}

/** Système de like **/
function like(id) {
    /* Incrémente le like */
    let nbLike = document.getElementById("like-"+id).innerHTML;
    nbLike = parseInt(nbLike);
    nbLike = nbLike + 1;
    /* Change dans les éléments */
    document.getElementById("like-"+id).innerHTML = nbLike;
    let nbLikeTotal = document.getElementById("profil-likes-photographe").innerHTML;
    nbLikeTotal = parseInt(nbLikeTotal);
    nbLikeTotal = nbLikeTotal + 1;
    document.getElementById("profil-likes-photographe").innerHTML = nbLikeTotal;
    /* Change la fonction */
    document.getElementsByClassName("like-"+id)[0].getElementsByClassName("like-coeur")[0].setAttribute("onclick", "unlike('"+id+"')");
}

function unlike(id) {
    /* Décrémente le like */
    let nbLike = document.getElementById("like-"+id).innerHTML;
    nbLike = parseInt(nbLike);
    nbLike = nbLike - 1;
    /* Change dans les éléments */
    document.getElementById("like-"+id).innerHTML = nbLike;
    let nbLikeTotal = document.getElementById("profil-likes-photographe").innerHTML;
    nbLikeTotal = parseInt(nbLikeTotal);
    nbLikeTotal = nbLikeTotal - 1;
    document.getElementById("profil-likes-photographe").innerHTML = nbLikeTotal;
    /* Change la fonction */
    document.getElementsByClassName("like-"+id)[0].getElementsByClassName("like-coeur")[0].setAttribute("onclick", "like('"+id+"')");
}

/** Lightbox **/
function ouvreLightbox(index, photo, titre) {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.getElementById("lightbox").style.display = "block";
    let totalPhoto = document.querySelectorAll(".photo").length;
    if(index == 1) {
        document.getElementById("fleche-gauche").style.display = "none";
    } else {
        document.getElementById("fleche-gauche").style.display = "block";
    }
    document.getElementById("fleche-gauche").setAttribute("onclick", "flecheGauche("+(index-1)+")");
    if(index == (totalPhoto - 2)) {
        document.getElementById("fleche-droite").style.display = "none";
    } else {
        document.getElementById("fleche-droite").style.display = "block";
    }
    document.getElementById("fleche-droite").setAttribute("onclick", "flecheDroite("+(index+1)+")");
    document.getElementById("photo-lightbox").setAttribute("src", photo);
    document.getElementById("titre-photo-lightbox").innerHTML = titre;
}

function fermerLightbox() {
    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.getElementById("lightbox").style.display = "none";
}

function flecheGauche(index) {
    let photoAvant = document.getElementsByClassName("photo")[index-1].getElementsByClassName("src-contenu")[0].getAttribute("src");
    let titreAvant = document.getElementsByClassName("photo")[index-1].getElementsByClassName("titre-photo")[0].innerHTML;
    ouvreLightbox(index, photoAvant, titreAvant);
}

function flecheDroite(index) {
    let totalPhoto = document.querySelectorAll(".photo").length;
    if(index < (totalPhoto - 1)) {
    let photoApres = document.getElementsByClassName("photo")[index+1].getElementsByClassName("src-contenu")[0].getAttribute("src");
    let titreApres = document.getElementsByClassName("photo")[index+1].getElementsByClassName("titre-photo")[0].innerHTML;
    ouvreLightbox(index, photoApres, titreApres);
    }
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
    var indexPhoto = 0;
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
            indexPhoto = indexPhoto + 1;
            let photosDOM = AffichePhotos(indexPhoto, photos["id"], photos["title"], nomPhotographe, typePhoto, nomPhoto, photos["tags"], photos["likes"], photos["date"], photos["price"]);
            photosDOM = photosDOM.construct();
            document.getElementById('profil-liste-photos').insertAdjacentHTML('beforeend', photosDOM);
        }
    }
    /** Likes et tarif du photographe **/
    let likesTarifDOM = LikeTarif(likeTotal, photographe.price);
    likesTarifDOM = likesTarifDOM.construct();
    document.getElementById('profil-likes-tarif').insertAdjacentHTML('beforeend', likesTarifDOM);
}).catch(err => {});