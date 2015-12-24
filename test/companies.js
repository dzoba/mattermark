'use strict';

var chai = require('chai');
var expect = chai.expect;

var fs = require('fs');
var API_KEY = process.env.MM_API_KEY || fs.readFileSync('apikey', "utf8").replace(/(\r\n|\n|\r)/gm,"");
var Mattermark = require('../lib/index.js')(API_KEY);

describe('Companies', function () {
  describe('List', function () {
    it('should return the first page of companies', function (done) {
      Mattermark.companies.list(function (err, res) {
        expect(res).to.have.property('meta');
        expect(res.meta.total_record_count).to.be.at.least(1400000);
        expect(res.meta.total_pages).to.be.at.least(28000);
        expect(res.meta.current_page).to.equal(1);

        expect(res).to.have.property('companies');
        expect(res.companies).to.be.a('array');
        expect(res.companies.length).to.equal(10);

        return done();
      });
    });
  });

  describe('Query', function () {
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
        expect(res.companies.length).to.equal(10);

        return done();
      });
    });
  });

  describe('By ID', function () {
    it('should find a company by ID', function (done) {
      Mattermark.companies.byId(143115, function (err, res) {
        expect(res.name).to.equal('MetricsCat');
        expect(res.website).to.equal('metricscat.com');
        expect(res.linkedin_id).to.equal('3249905');
        
        return done();
      });
    });
  });

  describe('News Stories', function () {
    it('should find a company\'s news stories', function (done) {
      Mattermark.companies.stories(74910, function (err, res) {
        expect(res).to.be.a('array');
        expect(res[0].id).to.be.a('number');
        expect(res[0].title).to.be.a('string');

        return done();
      });
    });
  });

  describe('Similar Companies', function () {
    it('should find companies similar to the id provided', function (done) {
      Mattermark.companies.similar(74910, function (err, res) {
        expect(res).to.be.a('array');
        expect(res[0].id).to.be.a('number');
        expect(res[0].probability).to.be.a('number');
        expect(res[0].company_name).to.be.a('string');
        expect(res[0].description).to.be.a('string');
        expect(res[0].total_funding).to.be.a('number')

        return done();
      });
    });
  });
});
