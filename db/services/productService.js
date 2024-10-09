const db = require("../db.js");
const ProductModel = require("../models/productModel.js");

class ProductService {
    static createProduct(product) {
        const sql = `INSERT INTO products(name, description, price, stock, image) VALUES(?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [product.name, product.description, product.price, product.stock, product.image], (err) => {
                if(err) return reject(err);

                resolve()
            })
        })
    }

    static getAllProducts() {
        const sql = `SELECT * FROM products`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                resolve(rows?.map(row => new ProductModel(row.id, row.name, row.description, row.price, row.stock, row.image)));
            });
        });
    }

    static getProductById(id) {
        const sql = `SELECT * FROM products where id = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, rows) => {
                if (err) return reject(err);

                resolve(rows.map(row => new ProductModel(row.id, row.name, row.description, row.price, row.stock, row.image)));
            });
        });
    }

    static updateProduct(product) {
        const sql = `UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [product.name, product.description, product.price, product.stock, product.id], function(err) {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    static deleteProduct(id) {
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