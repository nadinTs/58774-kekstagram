/*eslint-disable no-unused-vars*/
'use strict';

var getPictureTemplate = require('../js/getPictureTemplate.js');
var Gallery = require('../js/gallery.js');


var renderPictures = function(pictures) {
  var container = document.querySelector('.pictures');
  pictures.forEach(function(elem) {
    container.appendChild(getPictureTemplate(elem));
  });
  var myGallery = new Gallery(pictures);
};

module.exports = renderPictures;
