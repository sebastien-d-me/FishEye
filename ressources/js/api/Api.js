class Api {
    constructor(url) {
        this.url = url
    }

    async getPhotographesJSON() {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.photographers)
            .catch(err => console.log('erreur', err))
    }

    async getPhotosJSON() {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.media)
            .catch(err => console.log('erreur', err))
    }

    async getLikesJSON() {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.media)
            .catch(err => console.log('erreur', err))
    }
}


class PhotographeApi extends Api {
    constructor(url) {
        super(url)
    }

    async getPhotographes() {
        return await this.getPhotographesJSON()
    }

    async getPhotos() {
        return await this.getPhotosJSON()
    }

    async getLikes() {
        return await this.getLikesJSON()
    }
}