# mattermark api wrapper

Node.js wrapper for the [Mattermark.com](http://mattermark.com) API. See full Mattermark API documentation [here](http://http://mattermark.com/api/).

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Options](#options)
- [Examples](#examples)
- [Contributing](#contributing)
- [Testing](#testing)

## Getting Started

First, you will need to get API access from [Mattermark.com](http://mattermark.com/api/) in the form of an API Key.

### Installation

This library can be installed through npm:

```
$ npm install mattermark
```

To build and install from the latest source:

```
$ git clone git@github.com:dzoba/mattermark.git
$ npm install
```

### Usage
```javascript
var Mattermark = require('mattermark')('YOUR API KEY');

// change internal defaults (e.g. host)
var options = {/* see options below */};
var Mattermark = require('mattermark')('YOUR API KEY', options);

// you can also just pass options
var options = { apiKey: 'foo', host: 'bar' };
var Mattermark = require('mattermark')(options);

// callback pattern
Mattermark.companies.list(function (err, body) {
  if (err) return callback(err);
  return callback(null, body.data);
});
```

Additionally, every resource method returns a promise, so you don't have to use the regular callback. E.g.

```javascript
var Mattermark = require('mattermark')('YOUR API KEY');

Mattermark.companies.list()
.then(function (res) {
  console.log(res.data);
})
.catch(function (e) {
  console.log(e);
});
```

### Options
The Mattermark constructor accepts an `options` object which may contain one or more of the following options:

* `host` - Override the default host API calls are issued to.
* `userAgent` - Override the default userAgent.
* `headers` - Edit the headers sent in all API calls.

## Examples

Various examples for you to try out are here: [here](https://github.com/dzoba/mattermark/tree/master/examples).

## Contributing

Contributions are very welcome!  Please log issues using the Github issues interface.  Please submit code changes in the form of a pull request from your own branched version of the project.

## Testing

To run the tests you will need an API key.  This can be set in an environment variable named MM_API_KEY, or in a file called apikey in the root of this project.  Then run:

    npm run test
To lint the code (please lint before submitting a PR):

    npm run lint

=======================

Released under the MIT License, which can be found in the repository in `LICENSE.txt`.
