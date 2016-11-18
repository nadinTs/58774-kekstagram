'use strict';

var getSearchStr = function(params) {
  return Object.keys(params).map(function(param) {
    return [param, params[param]].join('=');
  }).join('&');
};
var load = function(url, params, callback) {

  var xhr = new XMLHttpRequest();
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.open('GET', url + '?' + getSearchStr(params));
  xhr.send();
};

module.exports = load;
