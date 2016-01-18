import Fetch from 'whatwg-fetch';
import config from '../../config.json'
let rootUrl = "https://lab.jurvis.co/columbus/api/"

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url, {
      headers: {
        'Authorization': config.api_key
      }
    })
    .then(function(response){
      console.log(response);
      return response.json()
    });
  }
};
