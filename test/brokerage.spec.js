const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
const sinon = require('sinon');
const Portfolio = require('../lib/portfolio');
const Brokerage = require('../lib/brokerage');

describe('Brokerage', () => {

  describe('#brokerage', () => {

    it('it should create a brokerage object', () => {
      let b1 = new Brokerage('Jones inc');
      expect(b1).to.be.instanceof(Brokerage);
      expect(b1.name).to.equal('Jones inc');
    });


  });

});
