'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Companies = function (config) {
  ResourceBase.call(this, 'search', config);
};

util.inherits(Companies, ResourceBase);

(function () {

  this.query = function (query, callback) {
    return this._transmit('GET', '&term=' + query, null, null, callback);
  };

}).call(Companies.prototype);

module.exports = Companies;
