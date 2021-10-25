/** Retour au contenu **/
window.onscroll = function() {
    if (window.scrollY != 0) {
        document.getElementById("retour-contenu").style.display = "block";
    } else {
        document.getElementById("retour-contenu").style.display = "none";
    }
}