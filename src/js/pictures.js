'use strict';

var Picture = require('../js/picture.js');
var Gallery = require('../js/gallery.js');

var renderPictures = function(pictures) {
  var container = document.querySelector('.pictures');
  pictures.forEach(function(data, pictureIndex) {
    var picture = new Picture(data, pictureIndex);
    container.appendChild(picture.element);
  });
  Gallery.setPictures(pictures);
};

module.exports = renderPictures;
