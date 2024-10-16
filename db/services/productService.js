const db = require("../db.js");
const ProductModel = require("../models/productModel.js");

class ProductService {
    static create(product) {
        const sql = `INSERT INTO products(name, price, stock, image) VALUES(?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [product.name, product.price, product.stock, product.image], (err) => {
                if(err) return reject(err);

                resolve({id: this.lastID})
            })
        })
    }

    static getProductCount() {
        let sql = `SELECT COUNT(*) as count FROM products`;

        return new Promise((resolve, reject) => {
            db.get(sql, [], (err, res) => {
                if (err) return reject(err);

                resolve({ count: res.count });
            });
        });
    }

    static getAll(itemsPerPage, offset) {
        let sql = `SELECT * FROM products`;
        const queryParams = new Array;

        if(itemsPerPage) {
            sql += ` LIMIT ? OFFSET ?`
            queryParams.push(itemsPerPage, offset);
        }

        return new Promise((resolve, reject) => {
            db.all(sql, queryParams, (err, rows) => {
                if (err) return reject(err);
                if(!rows) return resolve();
                
                resolve(rows.map(row => new ProductModel(row.name, row.price, row.stock, row.image, row.id)));
            });
        });
    }



    static getById(id) {
        const sql = `SELECT * FROM products WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                
                resolve(new ProductModel(row.name, row.price, row.stock, row.image, row.id));
            });
        });
    }

    static update(product) {
        const sql = `UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [product.name, product.price, product.stock, product.id], (err) => {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    static delete(id) {
        const sql = `DELETE FROM products WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [id], function(err) {
                if (err) return reject(err);

                resolve();
            });
        });
    }
}

module.exports = ProductService;