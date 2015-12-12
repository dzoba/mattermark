'use strict';

var chai = require('chai');
var expect = chai.expect;

var fs = require('fs');
var API_KEY = fs.readFileSync('apikey', "utf8").replace(/(\r\n|\n|\r)/gm,"");
var Mattermark = require('../lib/index.js')(API_KEY);

describe('Companies', function () {
  describe('list', function () {
    it('should return the first page of companies', function (done) {
      Mattermark.companies.list(function (err, res) {
        expect(res).to.have.property('meta');
        expect(res.meta.total_record_count).to.be.at.least(1400000);
        expect(res.meta.total_pages).to.be.at.least(28000);
        expect(res.meta.current_page).to.equal(1);

        expect(res).to.have.property('companies');
        expect(res.companies).to.be.a('array');
        expect(res.companies.length).to.equal(50);

        return done();
      });
    });
  });

  describe('query', function () {
    it('should return companies matching the query', function (done) {
      Mattermark.companies.query({
        employees: '100~',
        state: 'CA',
        total_funding: '1000000~'
      }, function (err, res) {
        expect(res).to.have.property('meta');
        expect(res.meta.total_record_count).to.be.at.least(500);
        expect(res.meta.total_pages).to.be.at.least(10);
        expect(res.meta.current_page).to.equal(1);

        expect(res).to.have.property('companies');
        expect(res.companies).to.be.a('array');
        expect(res.companies.length).to.equal(50);

        return done();
      });
    });
  });

});
