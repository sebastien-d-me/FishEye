class PhotographeVideo {
    constructor(photo, idURL, nomPhotographe) {
        this.photo = photo;
        this.idPage = idURL;
        this.nomPhotographe = nomPhotographe;
    }

    createPhotographeGallerie() {
        if(`${this.photo.photographerId}` == this.idPage) {
            const photo = document.createElement('div');
            photo.classList.add("photo");
            photo.setAttribute("id", `${this.photo.id}`)

            var cartePhoto = `
                <a href="#" onclick="ouvreLightbox(${this.photo.indexPhoto}, 'ressources/img/${this.photo.nomPhotographe}/${this.photo.video}', '${this.photo.title}')">
                    <video controls class="img-photo">
                        <source class="src-contenu" src="ressources/img/${this.nomPhotographe}/${this.photo.video}" type="video/mp4">
                    </video>
                </a>
                <div class="block-photo">
                    <span class="titre-photo">${this.photo.title}</span>
                    <span class="like like-${this.photo.id}">
                    <span id="like-${this.photo.id}">${this.photo.likes}</span> 
                        <span class="like-coeur" onclick="systemeLike('${this.photo.id}', 'like')">♥</span>
                    </span>
                </div>
            `;
            photo.innerHTML = cartePhoto;
            return photo;
        } else {
            return "";
        }        
    }

}