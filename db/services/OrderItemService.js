const db = require('../db');
const OrderItemModel = require('../models/orderItemModel');

class OrderItemService {
    static createOrderItem(orderItem) {
        const sql = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;
        
        return new Promise((resolve, reject) => {
            db.run(sql, [orderItem.orderId, orderItem.productId, orderItem.quantity, orderItem.price], function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    static getAllOrderItems() {
        const sql = `SELECT * FROM order_items`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows.map(row => new OrderItemModel(row.id, row.order_id, row.product_id, row.quantity, row.price)));
            });
        });
    }

    static getOrderItemsByOrderId(orderId) {
        const sql = `SELECT * FROM order_items WHERE order_id = ?`;
        return new Promise((resolve, reject) => {
            db.all(sql, [orderId], (err, rows) => {
                if (err) return reject(err);
                resolve(rows.map(row => new OrderItemModel(row.id, row.order_id, row.product_id, row.quantity, row.price)));
            });
        });
    }

    static updateOrderItem(orderItem) {
        const sql = `UPDATE order_items SET product_id = ?, quantity = ?, price = ? WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.run(sql, [orderItem.productId, orderItem.quantity, orderItem.price, orderItem.id], function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    static deleteOrderItem(id) {
        const sql = `DELETE FROM order_items WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = OrderItemService;
