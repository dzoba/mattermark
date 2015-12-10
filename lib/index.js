'use strict';

var resources = require('./resources');
var MM_HOST = 'https://api.mattermark.com/';

var Mattermark = function (apiKey, options) {

  if (!(this instanceof Mattermark)) {
    return new Mattermark(apiKey, options);
  }

  if (apiKey && typeof apiKey === 'object') {
    options = apiKey;
    apiKey = null;
  }

  this.options = {
    apiKey:    apiKey,
    host:      MM_HOST
  };

  if (options && typeof options === 'object') {
    for (var key in options)      {
      this.options[key] = options[key];
    }
  }

  this._initResources();
};

(function () {
  this._initResources = function () {
    var services = Object.keys(resources);

    for (var i = 0; i < services.length; i++) {
      var service = services[i];
      this[service] = new resources[service](this);
    }
  };
}).call(Mattermark.prototype);

module.exports = Mattermark;
