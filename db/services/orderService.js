const db = require("../db.js");
const OrderModel = require("../models/orderModel.js");

class OrderService {
    static createOrder(order) {
        const sql = `INSERT INTO orders (user_id, order_date, total) VALUES (?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [order.userId, order.orderDate, order.total], function (err) {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    static getAllOrders() {
        const sql = `SELECT * FROM orders`;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                resolve(rows.map(row => new OrderModel(row.id, row.user_id, row.order_date, row.total)));
            });
        });
    }

    static getOrderById(id) {
        const sql = `SELECT * FROM orders WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);

                // console.log(row)
                resolve(new OrderModel(row.id, row.user_id, row.order_date, row.total));
            });
        });
    }

    static updateOrder(order) {
        const sql = `UPDATE orders SET user_id = ?, order_date = ?, total = ? WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [order.userId, order.orderDate, order.total, order.id], function (err) {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    static deleteOrder(id) {
        const sql = `DELETE FROM orders WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) return reject(err);
                
                resolve();
            });
        });
    }
}

module.exports = OrderService;