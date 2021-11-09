class PhotoFactory {
    constructor(photo, idURL) {
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
        if("image" in photo) {
            return new Photo(photo, nomPhotographe)
        } else {
            return new Video(photo, nomPhotographe)
        }
    }
}