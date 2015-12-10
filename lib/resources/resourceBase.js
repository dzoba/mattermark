'use strict';

var stream    = require('stream');
var request   = require('request');
var BBPromise = require('bluebird');

var ResourceBase = function (endpoint, config) {
  this.uri    = config.options.host + endpoint;
  this.config = config.options;
};

(function () {

  this._transmit = function (method, uri, qs, form, callback) {

    var opts = {
      url: this.uri + '?key=' + this.config.apiKey,
      method: method,
      auth: { user: this.config.apiKey, password: '' },
      headers: this.config.headers,
      json: true
    };

    var isMultiPartForm = false;

    for (var key in form) {
      if (form[key] === true || form[key] === false) {
        form[key] = form[key].toString();
      }
    }

    for (var param in form) {
      var val = form[param];

      if (val instanceof stream.Stream) {
        isMultiPartForm = true;
        break;
      }

      if (val !== undefined && val !== null && val.hasOwnProperty('value')) {
        isMultiPartForm = true;
        break;
      }
    }

    if (qs) {
      opts.qs = qs;
    }

    if (form) {
      if (isMultiPartForm) {
        opts.formData = form;
      } else {
        opts.form = form;
      }
    }

    return new BBPromise(function (resolve, reject) {
      request(opts, function (err, resp, body) {

        if (err) {
          return reject(err);
        }

        if (body && body.error) {
          return reject(body.error);
        }

        if (resp && resp.statusCode >= 500) {
          var error = new Error(resp.statusMessage + ' (' + resp.statusCode + ')');
          error.statusCode = resp.statusCode;
          error.statusMessage = resp.statusMessage;
          return reject(error);
        }

        return resolve(body);
      });
    }).nodeify(callback);
  };

}).call(ResourceBase.prototype);

module.exports = ResourceBase;
