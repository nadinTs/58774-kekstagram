'use strict';

var Picture = require('../js/picture.js');
var Gallery = require('../js/gallery.js');
var load = require('../js/load.js');

var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';
var pageNumber = 0;
var pageSize = 12;
var activeFilter = 1;
// var filter = 12;
var GAP = 100;
var pictureIndex = 0;


var footer = document.querySelector('footer');
var filter = document.querySelector('.filters');
var container = document.querySelector('.pictures');
  // filter.classList.add('hidden');
  // filter.classList.remove('hidden');

var loadPictures = function(filter, currentPageNumber) {
  console.log('Loading page: ' + currentPageNumber);
  load(PICTURE_LOAD_URL, {
      from: currentPageNumber * pageSize,
      to: (currentPageNumber + 1) * pageSize,
      filter: filter
    },
    renderPictures);
}

var changeFilter = function(filterID) {
  container.innerHTML = '';
  activeFilter = filterID;
  pageNumber = 0;
  pictureIndex = 0;
  Gallery.clearPictures();
  loadPictures(filterID, pageNumber);
}

window.addEventListener('scroll', function() {
  if (footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
    console.log(window.innerHeight);
    loadPictures(activeFilter, ++pageNumber);
  }
});

var renderPictures = function(pictures) {
  pictures.forEach(function(data) {
    var picture = new Picture(data, pictureIndex++);
    container.appendChild(picture.element);
  });
  Gallery.addPictures(pictures);
};

module.exports = changeFilter;
