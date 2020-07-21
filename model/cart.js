module.exports = function Cart(oldCart) {
    this.date = Date.now()
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        let storedItem = this.items[id];
        if(storedItem)  return;

        storedItem = this.items[id] = {item: item}
        this.totalQty++;
        this.totalPrice += storedItem.item.product.amount;

    }

    this.removeItem = function(id) {
        this.totalQty--;
        this.totalPrice -= this.items[id].item.product.amount;
        delete this.items[id]
    }

    this.generateArray = function() {
        let arr = [];
        for(let id in this.items)
            arr.push(this.items[id])

        return arr;
    }
}