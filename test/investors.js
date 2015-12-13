'use strict';

var chai = require('chai');
var expect = chai.expect;

var fs = require('fs');
var API_KEY = process.env.MM_API_KEY || fs.readFileSync('apikey', "utf8").replace(/(\r\n|\n|\r)/gm,"");
var Mattermark = require('../lib/index.js')(API_KEY);

describe('Investors', function () {
  describe('By ID', function () {
    it('should find investor with id 273', function (done) {
      Mattermark.investors.byId(273, function (err, res) {
        expect(res.id).to.equal(273);
        expect(res.name).to.equal('TransCosmos');
        expect(res.website).to.equal('transcosmos.com');

        expect(res.most_recent_funding).to.be.a('object');
        expect(res.portfolio_aggregates).to.be.a('object');
        expect(res.deal_aggregates).to.be.a('object');
        expect(res.top_industries).to.be.a('array');

        return done();
      });
    });
  });

  describe('Query', function () {
    it('should find the portfolio belonging to investor id 124 ', function (done) {
      Mattermark.investors.portfolio(124, function (err, res) {
        expect(res).to.have.property('meta');
        expect(res.meta.total_record_count).to.equal(13);
        expect(res.meta.total_pages).to.be.at.least(1);
        expect(res.meta.current_page).to.equal(1);

        expect(res).to.have.property('companies');
        expect(res.companies).to.be.a('array');
        expect(res.companies.length).to.equal(13);
        return done();
      });
    });
  });
});
