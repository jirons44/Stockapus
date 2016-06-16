/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Stock = require('../lib/stock');

describe('Stock', () => {
  describe('constructor', () => {
    it('should construct a new Stock object', () => {
      const s1 = new Stock('aapl');
      expect(s1.symbol).to.equal('AAPL');
    });
  });

  describe('#purchase', () => {
    it('should purchase stock', (done) => {
      const s1 = new Stock('aapl');
      s1.purchase(50, (err, totalPaid) => {
        expect(err).to.be.null;
        expect(totalPaid).to.equal(s1.shares * s1.purchasePricePerShare);
        expect(s1.shares).to.equal(50);
        expect(s1.name).to.equal('Apple Inc');
        expect(s1.purchasePricePerShare).to.be.above(0);
        done();

      });
    });
  });
});
