class UserModel {
    constructor(name, email, password, isAdmin, id) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}


module.exports = UserModel