'use strict';

var load = require('../js/load');
var getPictureTemplate = require('../js/getPictureTemplate');

  var container = document.querySelector('.pictures');
  var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';

  var renderPictures = function (el) {
    el.forEach(function (elem) {
      container.appendChild(getPictureTemplate(elem));
    });
  };

  load(PICTURE_LOAD_URL, renderPictures);
