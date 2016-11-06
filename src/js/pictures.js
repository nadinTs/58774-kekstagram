'use strict';
var load = require('./load');
var getPictureTemplate = require('./getPictureTemplate');

  var container = document.querySelector('.pictures');
  var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';

  // var renderPictures = function (el) {
  //   el.forEach(function (elem) {
  //     container.appendChild(getPictureTemplate(elem));
  //   });
  // };
  //
  // load(PICTURE_LOAD_URL, renderPictures, '__jsonpCallback');
