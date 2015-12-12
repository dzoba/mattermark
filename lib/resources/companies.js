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

  this.byId = function(id, callback) {
    var uriChunk = {
      text: '/' + id,
      beforeKey: true
    }
    return this._transmit('GET', uriChunk, null, null, callback);
  }

  this.stories = function(id, callback) {
    var uriChunk = {
      text: '/' + id + '/stories',
      beforeKey: true
    }
    return this._transmit('GET', uriChunk, null, null, callback);    
  }

  this.similar = function(id, callback) {
    var uriChunk = {
      text: '/' + id + '/similar',
      beforeKey: true
    }
    return this._transmit('GET', uriChunk, null, null, callback);     
  }

}).call(Companies.prototype);

module.exports = Companies;
