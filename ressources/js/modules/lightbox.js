/** Lightbox **/
export function ouvreLightbox(index, photo, titre) {
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
export function fermerLightbox() {
    document.getElementsByTagName("body")[0].style.overflow = "unset";
    document.getElementById("lightbox").style.display = "none";
}
/* Gère la flèche gauche */
export function flecheGauche(index) {
    let photoAvant = document.getElementsByClassName("photo")[index-1].getElementsByClassName("src-contenu")[0].getAttribute("src");
    let titreAvant = document.getElementsByClassName("photo")[index-1].getElementsByClassName("titre-photo")[0].innerHTML;
    ouvreLightbox(index, photoAvant, titreAvant);
}

/* Gère la flèche droite */
export function flecheDroite(index) {
    let totalPhoto = document.querySelectorAll(".photo").length;
    if(index < (totalPhoto - 1)) {
        let photoApres = document.getElementsByClassName("photo")[index+1].getElementsByClassName("src-contenu")[0].getAttribute("src");
        let titreApres = document.getElementsByClassName("photo")[index+1].getElementsByClassName("titre-photo")[0].innerHTML;
        ouvreLightbox(index, photoApres, titreApres);
    }
}