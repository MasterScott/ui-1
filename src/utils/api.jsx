var Fetch = require('whatwg-fetch');
var rootUrl = "https://lab.jurvis.co/columbus/api/"

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url)
      .then(function(response){
        return response.json()
      });
  }
};
