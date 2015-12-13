'use strict';

var chai = require('chai');
var expect = chai.expect;

var fs = require('fs');
var API_KEY = process.env.MM_API_KEY || fs.readFileSync('apikey', "utf8").replace(/(\r\n|\n|\r)/gm,"");
var Mattermark = require('../lib/index.js')(API_KEY);

describe('Fundings', function () {
  describe('List', function () {
    it('should list all funding events', function (done) {
      Mattermark.fundings.list(function (err, res) {
        expect(res).to.have.property('meta');
        expect(res.meta.total_record_count).to.be.at.least(39000);
        expect(res.meta.total_pages).to.be.at.least(780);
        expect(res.meta.current_page).to.equal(1);

        expect(res).to.have.property('fundings');
        expect(res.fundings).to.be.a('array');
        expect(res.fundings.length).to.equal(50);

        return done();
      });
    });
  });

  describe('Query', function () {
    it('should return fundings ocurring on 2015-01-25', function (done) {
      Mattermark.fundings.query({
        rounds_funding_date: '2015-01-25'
      }, function (err, res) {
        expect(res).to.have.property('meta');
        expect(res.meta.total_record_count).to.equal(1);
        expect(res.meta.total_pages).to.be.at.least(1);
        expect(res.meta.current_page).to.equal(1);

        expect(res).to.have.property('fundings');
        expect(res.fundings).to.be.a('array');
        expect(res.fundings.length).to.equal(1);

        expect(res.fundings[0].id).to.be.equal(152493);
        expect(res.fundings[0].company_id).to.be.equal(255624);
        expect(res.fundings[0].company_name).to.be.equal('Wobbleworks');
        expect(res.fundings[0].created_on).to.be.equal('2015-01-27 02:18:15');

        return done();
      });
    });
  });
});
