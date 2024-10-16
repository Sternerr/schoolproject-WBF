class ProductModel {
    constructor(name, price, stock, image, id) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.image = image;
    }
}


module.exports = ProductModel