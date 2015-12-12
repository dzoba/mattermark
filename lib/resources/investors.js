'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Investors = function (config) {
  ResourceBase.call(this, 'investors', config);
};

util.inherits(Investors, ResourceBase);

(function () {

  this.byId = function(id, callback) {
    var uriChunk = {
      text: '/' + id,
      beforeKey: true
    }
    return this._transmit('GET', uriChunk, null, null, callback);
  }

  this.portfolio = function(id, callback) {
    var uriChunk = {
      text: '/' + id + '/portfolio',
      beforeKey: true
    }
    return this._transmit('GET', uriChunk, null, null, callback);
  }

}).call(Investors.prototype);

module.exports = Investors;
