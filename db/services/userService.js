const db = require("../db.js");
const UserModel = require("../models/userModel.js");

class UserService {
    static createUser(user) {
        const sql = `INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [user.name, user.email, user.password, user.isAdmin], function (err) {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    static getUserById(id) {
        const sql = `SELECT * FROM users WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);

                resolve(new userModel(row.id, row.name, row.email, row.password, row.isAdmin));
            });
        });
    }

    static getAllUsers() {
        const sql = `SELECT * FROM users`;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                resolve(rows.map(row => new UserModel(row.id, row.name, row.email, row.password, row.isAdmin)));
            });
        });
    }

    static updateUser(user) {
        const sql = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [user.name, user.email, user.password, user.id, user.isAdmin], (err) => {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    static deleteUser(id) {
        const sql = `DELETE FROM users WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) return reject(err);

                resolve();
            });
        });
    }
}

module.exports = UserService;