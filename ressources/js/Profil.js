class Profil {
    constructor() {
        this.profilPhotographe = document.querySelector('#profil-infos-photographe');
        this.profilListePhotos = document.querySelector('#profil-liste-photos');
        this.profilLikes = document.querySelector('#profil-likes');
        this.profilTarif = document.querySelector('#profil-tarif');

        this.photographesApi = new PhotographeApi('ressources/data/FishEyeData.json');
    }

    async main() {
        let idURL = new URL(window.location.href).searchParams.get("id");
        let nomPhotographe = "";
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

        let photographesData = await this.photographesApi.getPhotographes();
        let Photographe = photographesData.map(photographe => new ProfilPhotographeFactory(photographe, idURL));
        Photographe.forEach(photographe => {
            const ProfilTemplate = new PhotographeProfil(photographe, idURL);
            this.profilPhotographe.append(
                ProfilTemplate.createPhotographeProfil()
            );
            if(photographe.id == idURL) {
                this.profilTarif.append(
                    `${photographe.price}€ / jour`
                )
            }
        });

        let photosData = await this.photographesApi.getPhotos();
        let Photo = photosData.map(photo => new PhotoFactory(photo, idURL));
        Photo.forEach(photo => {
            if("image" in photo) {
                let PhotoTemplate = new PhotographePhoto(photo, idURL, nomPhotographe);
                this.profilListePhotos.append(
                    PhotoTemplate.createPhotographeGallerie()
                );
            } else {
                let PhotoTemplate = new PhotographeVideo(photo, idURL, nomPhotographe);
                this.profilListePhotos.append(
                    PhotoTemplate.createPhotographeGallerie()
                );
            }
        });

        let Likes = await this.photographesApi.getLikes();
        let nbLikeTotal = 0;
        Likes.forEach(like => {
            if(like.photographerId == idURL) {
                nbLikeTotal = nbLikeTotal + like.likes;
            }
        });
        let LikeTemplate = new PhotographeLike(nbLikeTotal);
        this.profilLikes.append(
            LikeTemplate.createLikesProfil()
        );
    }
}

const profil = new Profil();
profil.main()


/** Système de contact **/
function contact(nom) {
    document.getElementById("contact").style.display = "block";
    document.getElementById("nom-contact").innerHTML = nom;
}
/* Fermer le formulaire */
function fermerContact() {
    document.getElementById("contact").style.display = "none";
}
/* Valide le formulaire */
function validerContact() {
    let nom = document.getElementById("form-nom").value;
    let prenom = document.getElementById("form-prenom").value;
    let email = document.getElementById("form-email").value;
    let message = document.getElementById("form-message").value;

    console.log("NOM : "+nom+" PRENOM : "+prenom);
    console.log("ADRESSE EMAIL : "+email);
    console.log("MESSAGE : "+message);
}


/** Système de like **/
function systemeLike(id, type) {
    /* Incrémente le like */
    let nbLike = document.getElementById("like-"+id).innerHTML;
    nbLike = parseInt(nbLike);
    let nbLikeTotal = document.getElementById("profil-likes-photographe").innerHTML;
    nbLikeTotal = parseInt(nbLikeTotal);
    if(type == "like") {
        nbLike = nbLike + 1;
        nbLikeTotal = nbLikeTotal + 1;
        /* Change la fonction */
        document.getElementsByClassName("like-"+id)[0].getElementsByClassName("like-coeur")[0].setAttribute("onclick", "systemeLike('"+id+"', 'unlike')");
    } else {
        nbLike = nbLike - 1;
        nbLikeTotal = nbLikeTotal - 1;
        /* Change la fonction */
        document.getElementsByClassName("like-"+id)[0].getElementsByClassName("like-coeur")[0].setAttribute("onclick", "systemeLike('"+id+"', 'like')");
    }
    /* Change dans les éléments */
    document.getElementById("like-"+id).innerHTML = nbLike;
    document.getElementById("profil-likes-photographe").innerHTML = nbLikeTotal;
}


/** Système de lightbox **/
function ouvreLightbox(index, titre) {
    /* Obtient le nombre total de photos */
    let totalPhoto = document.querySelectorAll(".photo").length;
    /* Récupère la photo lié à l'index */
    let photos = document.getElementById(index);
    /* Obtient la source de l'image */
    let photosSrc = photos.getElementsByClassName("src-contenu")[0].getAttribute("src");
    /* Obtient le type de l'image */ 
    let photoType = photosSrc.split('.').pop();
    let photoFormat = "";
    if(photoType === "jpg" || photoType === "jpeg" || photoType == "gif" || photoType === "png") {
        photoFormat = "image";
    } else if(photoType === "mp4" || photoType === "mkv" || photoType === "avi") {
        photoFormat = "video";
    }
    /* Récupère l'id de la photo */
    let idPhoto = index;
    /* Affiche la lightbox */
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.getElementById("lightbox").style.display = "block";
    /* Gère l'affichage des flèches */
    if(idPhoto === 1) {
        document.getElementById("fleche-gauche").style.display = "none";
            /* Change les index des flèches */
            document.getElementById("fleche-gauche").setAttribute("onclick", "");
    } else if(idPhoto === totalPhoto) {
        document.getElementById("fleche-droite").style.display = "none";
            /* Change les index des flèches */
            document.getElementById("fleche-droite").setAttribute("onclick", "");
    } else {
        document.getElementById("fleche-gauche").style.display = "block";
        document.getElementById("fleche-droite").style.display = "block";
            /* Change les index des flèches */
            document.getElementById("fleche-gauche").setAttribute("onclick", "flecheGauche("+(idPhoto-1)+")");
            document.getElementById("fleche-droite").setAttribute("onclick", "flecheDroite("+(idPhoto+1)+")");
    }
    /* Affiche la photo */
    if(photoFormat === "image") {
        document.getElementById("contenu-photo-lightbox").innerHTML = "<img id='photo-lightbox' src="+photosSrc+">";
    } else {
        document.getElementById("contenu-photo-lightbox").innerHTML = "<video id='photo-lightbox' controls><source src="+photosSrc+">";
    }
    /** Affiche le titre */
    document.getElementById("titre-photo-lightbox").innerHTML = titre;
}
/* Ferme la lightbox */
function fermerLightbox() {
    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.getElementById("lightbox").style.display = "none";
}
/* Gère la flèche gauche */
function flecheGauche(index) {
    let titreAvant = document.getElementsByClassName("photo")[index].getElementsByClassName("titre-photo")[0].innerHTML;
    ouvreLightbox(index, titreAvant);
}
/* Gère la flèche droite */
function flecheDroite(index) {
    let totalPhoto = document.querySelectorAll(".photo").length;
    if(index === (totalPhoto)) {
        let titreApres = Array.from(document.querySelectorAll('.photo')).pop();
        titreApres = titreApres.getElementsByClassName("titre-photo")[0].innerHTML;
        ouvreLightbox(index, titreApres);
    } else {
        let titreApres = document.getElementsByClassName("photo")[index].getElementsByClassName("titre-photo")[0].innerHTML;
        ouvreLightbox(index, titreApres);
    }
}


/** Système de trie **/
function trier(choixTrier) {
    switch(choixTrier.value) {
        case "Popularité":
            break;
        case "Date":
            break;
        case "Titre":
            break;
        default:
            break;
    }
}

