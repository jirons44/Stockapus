/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
const sinon = require('sinon');
const Portfolio = require('../lib/portfolio');



describe('Portfolio', () => {

    describe('#portfolio',(done) =>{
      it('should create a portfolio and add two stocks',(done)=>{
      const s1 = new Stock('aapl');
      s1.shares = 10;
      s1.purchasePricePerShare = 5;

      const s2 = new Stock('goog');
      s2.shares = 20;
      s2.purchasePricePerShare = 1;

      const p = new Portfolio('Tech');
      p.addStock(s1);
      p.addStock(s2);

      expect(p.stocks.length).to.equal(2);
      expect(p.position()).to.equal(70);

      done();
      });
    });

    // top describe
  });
