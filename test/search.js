'use strict';

var chai = require('chai');
var expect = chai.expect;

var fs = require('fs');
var API_KEY = fs.readFileSync('apikey', "utf8").replace(/(\r\n|\n|\r)/gm,"");
var Mattermark = require('../lib/index.js')(API_KEY);

describe('Search', function () {
  describe('Query', function () {
    it('should return information about Lyft', function (done) {
      Mattermark.search.query('Lyft', function (err, res) {
        expect(res).to.be.a('array');
        expect(res[0]).to.be.a('object');
        expect(res[0].object_id).to.equal(117766);

        return done();
      });
    });
  });
});
