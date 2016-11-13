'use strict';

var getPictureTemplate = require('../js/getPictureTemplate.js');
var Gallery = require('../js/gallery.js');

var renderPictures = function(pictures) {
  var container = document.querySelector('.pictures');
  var pictureIndex = 0;
  pictures.forEach(function(elem) {
    container.appendChild(getPictureTemplate(elem, pictureIndex++));
  });
  Gallery.setPictures(pictures);
};

module.exports = renderPictures;
