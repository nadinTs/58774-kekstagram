'use strict';

var Picture = require('../js/picture.js');
var Gallery = require('../js/gallery.js');
var load = require('../js/load.js');

/** @enum {number} */
var Filter = {
  'POPULAR': 'filter-popular',
  'NEW': 'filter-new',
  'DISCUSSED': 'filter-discussed'
};


/** @constant {Filter} */
var DEFAULT_FILTER = Filter.POPULAR;

var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';
var pageNumber = 0;
var pageSize = 12;
var activeFilter = DEFAULT_FILTER;
// var filter = 12;
var GAP = 100;
var pictureIndex = 0;


var footer = document.querySelector('footer');
var filters = document.querySelector('.filters');
var container = document.querySelector('.pictures');

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

  if ( typeof(filterID) === "undefined") {
    filterID = DEFAULT_FILTER;
  }

  console.log('Changing filter to: ' + filterID);

  container.innerHTML = '';
  activeFilter = filterID;
  pageNumber = 0;
  pictureIndex = 0;
  Gallery.clearPictures();
  // filter.classList.add('hidden');
  loadPictures(filterID, pageNumber);
  filters.classList.remove('hidden');
}

filters.addEventListener('change', function(evt) {
  console.log(evt);
  changeFilter(evt.target.id);
}, true);

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
