'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

var Fundings = function (config) {
  ResourceBase.call(this, 'fundings', config);
};

util.inherits(Fundings, ResourceBase);

(function () {

  this.list = function (callback) {
    return this._transmit('GET', null, null, null, callback);
  };

  this.query = function(opts, callback) {
    var text = '';
    for (var param in opts) {
      text += '&' + param + '=' + opts[param];
    }

    var uriChunk = {
      text: text
    }
    return this._transmit('GET', uriChunk, null, null, callback);
  }

}).call(Fundings.prototype);

module.exports = Fundings;
