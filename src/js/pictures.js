'use strict';

var getPictureTemplate = require('../js/getPictureTemplate.js');

var renderPictures = function(pictures) {
  var container = document.querySelector('.pictures');
  pictures.forEach(function(elem) {
    container.appendChild(getPictureTemplate(elem));
  });
};

module.exports = renderPictures;
