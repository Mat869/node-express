class Form {
    minLength(str, min) {
        if(str.length >= min) {
            return true;
        }
        return false;
    }

    maxLength(str, max) {
        if(str.length <= max) {
            return true;
        }
        return false;
    }

    isUsername(str) {
        if(str.indexOf(' ') === -1 && str.indexOf('_') === -1) {
            return true;
        }
        return false;
    }

    isPassword(str) {
        let numbers = /[0-9]/g;
        let letters = /[a-z]/g;
        if(str.match(numbers) && str.match(letters)) {
            return true;
        }
        return false;
    }

    isTitle(str) {

    }

    isFilename(str) {
        
    }
}

class RegForm extends Form {
    constructor(username, password) {
        super();
        this.username = username;
        this.password = password;
    }
    validate() {
        return this.minLength(this.username, 2) && this.maxLength(this.username, 16) && this.isUsername(this.username) && this.minLength(this.password, 6) && this.maxLength(this.password, 16) && this.isPassword(this.password);
    }
}

function validation(username, password) {
    let newUser = new RegForm(username, password);
    return newUser.validate();
}


module.exports = validation;
