var Fetch = require('whatwg-fetch');
var rootUrl = "https://lab.jurvis.co/columbus/api/"
var config = require('../config.json')

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url, {
      headers: {
        'Authorization': config.api-key
      }
    })
    .then(function(response){
      console.log(response);
      return response.json()
    });
  }
};
