class Form {

    isTitle(str) {
        if(str === '') {
            return false;
        }
        return true;
    }

    isFilename(str) {
        if(str.substring(str.lastIndexOf('.')) == '.jpg' || str.substring(str.lastIndexOf('.')) == '.png') {
            return true;
        }
        return false;
    }
}



class PhotoForm extends Form {
    constructor(title, filename) {
        super();
        this.title = title;
        this.filename = filename;
    }
    validate() {
        return this.isTitle(this.title) && this.isFilename(this.filename);
    }
}

function photoValidation(title, filename) {
    let newPhoto = new PhotoForm(title, filename);
    return newPhoto.validate();
}

module.exports = photoValidation;