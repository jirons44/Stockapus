const request = require('request');

function Stock (symbol){
  this.symbol = symbol.toUpperCase();
}

Stock.prototype.purchase = function (quantity, cb) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  let self = this;
  self.shares = quantity;

  request({ url, json: true }, (err, rsp, body) => {
    console.log('body:', body);
    self.name = body.Name;
    self.purchasePricePerShare = body.LastPrice;
    const totalCost = self.shares * self.purchasePricePerShare;
    cb(err, totalCost);
  });
};

module.exports = Stock;
