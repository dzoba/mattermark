'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Search = function (config) {
  ResourceBase.call(this, 'search', config);
};

util.inherits(Search, ResourceBase);

(function () {

  this.query = function (query, callback) {
    return this._transmit('GET', '&term=' + query, null, null, callback);
  };

}).call(Search.prototype);

module.exports = Search;
