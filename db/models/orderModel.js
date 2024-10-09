class OrderModel {
    constructor(id, userId, orderDate, total) {
        this.id = id;
        this.userId = userId;
        this.orderDate = orderDate;
        this.total = total;
    }
}


module.exports = OrderModel