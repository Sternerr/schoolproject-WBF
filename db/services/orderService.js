const db = require("../db.js");
const OrderModel = require("../models/orderModel.js");

class OrderService {
    static create(order) {
        const sql = `INSERT INTO orders (user_id, order_date, total) VALUES (?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [order.userId, order.orderDate, order.total], function (err) {
                if (err) return reject(err);

                resolve({ id: this.lastID});
            });
        });
    }

    static getAll() {
        const sql = `SELECT * FROM orders`;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                resolve(rows.map(row => new OrderModel(row.id, row.user_id, row.order_date, row.total)));
            });
        });
    }

    static getById(id) {
        const sql = `SELECT * FROM orders WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);

                resolve(new OrderModel(row.id, row.user_id, row.order_date, row.total));
            });
        });
    }

    static getUsersOrder(id) {
        const sql = `
        SELECT
            products.name,
            order_items.quantity,
            orders.order_date
        FROM 
            users
        INNER JOIN
            orders ON orders.user_id = users.id
        INNER JOIN
            order_items ON order_items.order_id = orders.id
        INNER JOIN
            products ON products.id = order_items.product_id
        WHERE
            users.id = ?;
        `;

        return new Promise((resolve, reject) => {
            db.all(sql, [id], (err, rows) => {                  
                resolve(rows.map(row => ({
                    name: row.name, 
                    quantity: row.quantity, 
                    date: row.order_date
                })));
            });
        });
    }

}

module.exports = OrderService;