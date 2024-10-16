const db = require("../db.js");
const User = require("../models/userModel.js");

// UserService class to manage database operations related to the 'users' table
class UserService {
    
    // Create a new user in the database
    static create(user) {
        const sql = `INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [user.name, user.email, user.password, user.isAdmin], function (err) {
                if (err) return reject(err);

                resolve({ });
            });
        });
    }

    // Authenticate a user by their email
    static authUser(email) {
        const sql = `SELECT * FROM users WHERE email = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [email], (err, row) => {
                if (err) return reject(err);

                if(!row) return resolve();

                resolve(new User(
                    row.name,
                    row.email,
                    row.password,
                    row.isAdmin,
                    row.id
                ));
            });
        });
    }

    // Get a user by their ID
    static getById(id) {
        const sql = `SELECT * FROM users WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);

                resolve(new User(row.name, row.email, row.password, row.isAdmin, row.id));
            });
        });
    }

    // Get all users from the database
    static getAll() {
        const sql = `SELECT * FROM users`;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                resolve(rows.map(row => new User(row.name, row.email, row.password, row.isAdmin, row.id)));
            });
        });
    }

    // Update an existing user's details
    static update(user) {
        const sql = `UPDATE users SET name = ?, email = ?, password = ?, isAdmin = ? WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [user.name, user.email, user.password, user.id, user.isAdmin], (err) => {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    // Delete a user by their ID
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