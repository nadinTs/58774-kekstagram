'use strict';

var getPictureTemplate = require('../js/getPictureTemplate.js');
var Gallery = require('../js/gallery.js');

var renderPictures = function(pictures) {
  var container = document.querySelector('.pictures');
  pictures.forEach(function(elem, pictureIndex) {
    container.appendChild(getPictureTemplate(elem, pictureIndex++));
  });
  Gallery.setPictures(pictures);
};

module.exports = renderPictures;
