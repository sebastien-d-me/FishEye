class Profil {
    constructor() {
        this.profilPhotographe = document.querySelector('#profil-infos-photographe');
        this.profilListePhotos = document.querySelector('#profil-liste-photos');
        this.profilLikes = document.querySelector('#profil-likes');
        this.profilTarif = document.querySelector('#profil-tarif');

        this.photographesApi = new PhotographeApi('ressources/data/FishEyeData.json');
    }

    async main() {
        var idURL = new URL(window.location.href).searchParams.get("id");
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

        const photographesData = await this.photographesApi.getPhotographes();
        const Photographe = photographesData.map(photographe => new ProfilPhotographeFactory(photographe, idURL));
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

        const photosData = await this.photographesApi.getPhotos();
        const Photo = photosData.map(photo => new PhotoFactory(photo, idURL));
        Photo.forEach(photo => {
            if("image" in photo) {
                const PhotoTemplate = new PhotographePhoto(photo, idURL, nomPhotographe);
                this.profilListePhotos.append(
                    PhotoTemplate.createPhotographeGallerie()
                );
            } else {
                const PhotoTemplate = new PhotographeVideo(photo, idURL, nomPhotographe);
                this.profilListePhotos.append(
                    PhotoTemplate.createPhotographeGallerie()
                );
            }
        });

        const Likes = await this.photographesApi.getLikes();
        var nbLikeTotal = 0;
        Likes.forEach(like => {
            if(like.photographerId == idURL) {
                nbLikeTotal = nbLikeTotal + like.likes;
            }
        });
        const LikeTemplate = new PhotographeLike(nbLikeTotal);
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
    var nom = document.getElementById("form-nom").value;
    var prenom = document.getElementById("form-prenom").value;
    var email = document.getElementById("form-email").value;
    var message = document.getElementById("form-message").value;

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
function ouvreLightbox(index, photo, titre) {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.getElementById("lightbox").style.display = "block";
    let totalPhoto = document.querySelectorAll(".photo").length;
    /* Gère la flèche gauche */
    if(index == 1) {
        document.getElementById("fleche-gauche").style.display = "none";
    } else {
        document.getElementById("fleche-gauche").style.display = "block";
    }
    document.getElementById("fleche-gauche").setAttribute("onclick", "flecheGauche("+(index-1)+")");
    /* Gère la flèche droite */
    if(index == (totalPhoto - 2)) {
        document.getElementById("fleche-droite").style.display = "none";
    } else {
        document.getElementById("fleche-droite").style.display = "block";
    }
    document.getElementById("fleche-droite").setAttribute("onclick", "flecheDroite("+(index+1)+")");
    document.getElementById("photo-lightbox").setAttribute("src", photo);
    document.getElementById("titre-photo-lightbox").innerHTML = titre;
}
/* Ferme la lightbox */
function fermerLightbox() {
    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.getElementById("lightbox").style.display = "none";
}
/* Gère la flèche gauche */
function flecheGauche(index) {
    let photoAvant = document.getElementsByClassName("photo")[index-1].getElementsByClassName("src-contenu")[0].getAttribute("src");
    let titreAvant = document.getElementsByClassName("photo")[index-1].getElementsByClassName("titre-photo")[0].innerHTML;
    ouvreLightbox(index, photoAvant, titreAvant);
}
/* Gère la flèche droite */
function flecheDroite(index) {
    let totalPhoto = document.querySelectorAll(".photo").length;
    if(index < (totalPhoto - 1)) {
        let photoApres = document.getElementsByClassName("photo")[index+1].getElementsByClassName("src-contenu")[0].getAttribute("src");
        let titreApres = document.getElementsByClassName("photo")[index+1].getElementsByClassName("titre-photo")[0].innerHTML;
        ouvreLightbox(index, photoApres, titreApres);
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

