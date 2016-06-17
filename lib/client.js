const Stock = require('../lib/stock');
const Portfolio = require('../lib/portfolio');

function Client(name) {
  this.name = name;
  this.cash = 0;
  this.portfolios = [];
}

Client.prototype.deposit = function (amount) {
  this.cash = amount;
};

Client.prototype.withdraw = function (amount) {
  if (this.cash >= amount) {
    this.cash -= amount;
  }
};

Client.prototype.purchaseStock = function (stockName, shares, portfolioName, callback) {
  const self = this;

  const stock = new Stock(stockName);

  stock.purchase(shares, function(err, totalPaid) {
    if (err !== null) return new Error('Stock Market down!!!');
    const portf = new Portfolio('portfolioName');
    if (self.cash < stock.LastPrice * shares) return new Error('Not enough cash');
    self.cash -= stock.LastPrice * shares;
    portf.addStock(stock);
    callback(err, stock);
  });
};

Client.prototype.sellStock = function (stockSymbol, shares, portfolioName, callback) {
  const self = this;

  const myPort = self.portfolios.filter(function( obj ) {
      return obj.name === portfolioName;
    });

  if (myPort === null) {
    callback(new Error('No portfolio found'));
  }

  console.log("MyPort", myPort);

  const myStock = myPort.stocks.filter(function( obj ) {
      return obj.symbol === stockSymbol;
    });


  if (myStock === null) {
    callback(new Error('No existing stock to sell'));
  }

  console.log('this is the stocks', myStock);



  /**/


  stock.sell(shares, function(err, totalSold) {
    if (err !== null) return new Error('Stock Market down!!!');





    console.log('myPort:', myPort);

    callback(err, stock);
  });
};



module.exports = Client;
