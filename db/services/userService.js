const db = require("../db.js");
const User = require("../models/userModel.js");

class UserService {
    static create(user) {
        const sql = `INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [user.name, user.email, user.password, user.isAdmin], function (err) {
                if (err) return reject(err);

                resolve({ });
            });
        });
    }

    static authUser(email) {
        const sql = `SELECT * FROM users WHERE email = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [email], (err, row) => {
                if (err) return reject(err);

                if(!row) return resolve();

                resolve(new User(
                    row.id,
                    row.name,
                    row.email,
                    row.password,
                    row.isAdmin
                ));
            });
        });
    }

    static getById(id) {
        const sql = `SELECT * FROM users WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);

                resolve(new User(row.id, row.name, row.email, row.password, row.isAdmin));
            });
        });
    }

    static getAll() {
        const sql = `SELECT * FROM users`;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                resolve(rows.map(row => new User(row.id, row.name, row.email, row.password, row.isAdmin)));
            });
        });
    }

    static update(user) {
        const sql = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [user.name, user.email, user.password, user.id, user.isAdmin], (err) => {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    static delete(id) {
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