'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Search = function (config) {
  ResourceBase.call(this, 'search', config);
};

util.inherits(Search, ResourceBase);

(function () {

  this.query = function (query, callback) {
  	var uriChunk = {
  		text: '&term=' + query
  	}
    return this._transmit('GET', uriChunk, null, null, callback);
  };

}).call(Search.prototype);

module.exports = Search;
