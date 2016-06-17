/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
const sinon = require('sinon');
const Portfolio = require('../lib/portfolio');

let clock;

describe('Stock', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    // if exact URL then this will be called-our fack service
    nock('http://dev.markitondemand.com')
    .get('/MODApis/Api/v2/Quote/json?symbol=AAPL')
    .reply(200, {
      Name: 'Apple',
      LastPrice: 100 });
  });

  after(() => {
    clock.restore();
    nock.restore();
  });

  describe('constructor', () => {
    it('should construct a new Stock object', () => {
      const s1 = new Stock('aapl');
      expect(s1.symbol).to.equal('AAPL');
    });
  });

  describe('#purchase', () => {
    it('should purchase stock', (done) => {
      const s1 = new Stock('aapl');
      clock.tick(15);
      s1.purchase(50, (err, totalPaid) => {
        expect(err).to.be.null;
        expect(s1.name).to.equal('Apple');
        expect(totalPaid).to.equal(5000);
        expect(s1.shares).to.equal(50);
        expect(s1.purchasePricePerShare).to.equal(100);
        expect(s1.purchaseDate.getTime()).to.equal(15);
        done();
      });
    });
  });

  describe('#sell', () => {
    it('should sell a stock', (done) => {
      const s1 = new Stock('aapl');
      s1.purchase(50, (err, totalPaid) => {
        expect(err).to.be.null;
        expect(s1.name).to.equal('Apple');
        //expect(s1.sell(30).shares).to.equal(20);
        s1.sell(30);
        expect(s1.shares).to.equal(20);
        done();
      });
    });

    it('should not sell a stock', (done) => {
      const s1 = new Stock('aapl');

      s1.purchase(50, (err, totalPaid) => {
        expect(err).to.be.null;
      });

      s1.sell(60, (err, totalPaid) => {
        expect(err.message).to.equal("Not Enough shares.");
      });

      done();
      });
    });

    // top describe
  });
