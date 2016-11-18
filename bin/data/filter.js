'use strict';

/** @enum {number} */
var Filter = {
  'POPULAR': 'filter-popular',
  'NEW': 'filter-new',
  'DISCUSSED': 'filter-discussed'
};

module.exports = function(list, filterID) {
  var result = list.slice(0); // создадим копию массива
  switch (filterID) {
    case Filter.NEW:
      result.sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case Filter.DISCUSSED:
      result.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;
  }
  return result;
};
