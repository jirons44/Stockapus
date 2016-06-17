const request = require('request');

function Stock (symbol){
  this.symbol = symbol.toUpperCase();
  this.purchasePricePerShare = 0;
  this.sellPricePerShare = 0;
  this.sellDate = 0;
}

Stock.prototype.purchase = function (quantity, cb) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  let self = this;
  self.shares = quantity;


  request({ url, json: true }, (err, rsp, body) => {
    //console.log('body:', body);
    self.name = body.Name;
    self.purchaseDate = new Date();
    self.purchasePricePerShare = body.LastPrice;
    const totalCost = self.shares * self.purchasePricePerShare;
    cb(err, totalCost);
  });
};


Stock.prototype.sell = function (quantity, cb) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  let self = this;

  if ( self.shares < quantity)
    return cb(new Error('Not Enough shares.'), 0);

  self.shares -= quantity;

  request({ url, json: true }, (err, rsp, body) => {
    console.log('body:', body);
    self.sellDate = new Date();
    self.sellPricePerShare = body.LastPrice;
    const totalSold = body.LastPrice * quantity;
    cb(err, totalSold);
  });
};



module.exports = Stock;
