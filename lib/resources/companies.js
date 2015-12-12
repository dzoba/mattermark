'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Companies = function (config) {
  ResourceBase.call(this, 'companies', config);
};

util.inherits(Companies, ResourceBase);

(function () {

  this.list = function (callback) {
    return this._transmit('GET', null, null, null, callback);
  };

}).call(Companies.prototype);

module.exports = Companies;