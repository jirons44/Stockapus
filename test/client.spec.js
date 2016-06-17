const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
const sinon = require('sinon');
const Portfolio = require('../lib/portfolio');
const Client = require('../lib/client')

let clock;

describe('Client', () => {
  before(() => {
    // if exact URL then this will be called-our fack service
    nock('http://dev.markitondemand.com')
    .persist()
    .get('/MODApis/Api/v2/Quote/json?symbol=AAPL')
    .reply(200, {
      Name: 'Apple',
      LastPrice: 100 });
  });

  after(() => {
    nock.cleanAll();
  });

  describe('constructor', () => {
    it('should construct a new Client object', () => {
      const s1 = new Client('Bob');
      expect(s1.name).to.equal('Bob');
    });
  });


  describe('#deposit', () => {
    it('should deposit cash', () => {
      const c1 = new Client('Bob');
      c1.deposit(1000);
      expect(c1.cash).to.equal(1000);
    });
  });

  describe('#withdraw', () => {
    it('should deposit cash', () => {
      const c1 = new Client('Bob');
      c1.deposit(1000);
      c1.withdraw(500);
      expect(c1.cash).to.equal(500);
      c1.withdraw(600);
      expect(c1.cash).to.equal(500);
    });
  });


  describe('#purchaseStock', () => {
    it('should purchase a stock', (done) => {
      const c1 = new Client('Bob');
      c1.deposit(1500);

      c1.purchaseStock('aapl', 50, 'Tech', (err, stock) => {
        expect(err).to.be.null;
        expect(stock.name).to.equal('Apple');
        done();
      });
    });
  });

  describe('#sellStock', () => {
    it('should sell a stock', (done) => {
      const p1 = new Portfolio('Tech');
      p1.stocks = [{symbol:'AAPL',shares:10},{symbol:'AAPL',shares:20},{symbol:'GOOG',shares:20}];
      const c1 = new Client('Bob');
      c1.portfolios.push(p1);

      c1.sellStock('aapl', 15, 'Tech', (err, stock) => {
        expect(err).to.be.null;
        expect(c1.cash).to.equal(1000);
        done();
      });
    });
  });
});

  //   it('should not sell a stock', (done) => {
  //     const s1 = new Stock('aapl');
  //     s1.purchase(50, (err, totalPaid) => {
  //       expect(err).to.be.null;
  //     });
  //     s1.sell(60, (err, totalPaid) => {
  //       expect(err.message).to.equal("Not Enough shares.");
  //     });
  //    done();
  // });
