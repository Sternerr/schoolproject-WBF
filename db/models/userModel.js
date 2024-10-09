class UserModel {
    constructor(id, name, email, password, isAdmin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}


module.exports = UserModel