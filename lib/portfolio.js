function Portfolio(name) {
    this.name = name;
    this.stocks = [];
}

Portfolio.prototype.addStock = function (stock) {
  this.stocks.push(stock);
};
//a
Portfolio.prototype.position = function () {
  //console.log('position this.stocks=', this.stocks);

  return this.stocks.reduce((sum, a) => sum +
    (a.shares * a.purchasePricePerShare), 0);



};

module.exports = Portfolio;
