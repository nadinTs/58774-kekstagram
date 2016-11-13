'use strict';

var pictures;
var galleryOverlay;
var activePicture;
var picturesDom;

var Gallery = function(arr) {

  picturesDom = document.querySelectorAll('.picture');
  pictures = arr;
  this.setPictures(picturesDom);
};
Gallery.prototype.setPictures = function(arrayEl) {

  for (var i = 0; i < arrayEl.length; i++) {
    arrayEl[i].setAttribute('id', i);
    arrayEl[i].addEventListener('click', showCount);
  }
};
var showCount = function() {
  activePicture = this.getAttribute('id');
  show(activePicture);
};

var show = function(number) {
  galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  galleryOverlay.classList.remove('invisible');
  galleryOverlayClose.addEventListener('click', hide);
  setActivePicture(number);
  galleryOverlay.addEventListener('click', function() {
    if (number < pictures.length) {
      setActivePicture((number++));
    } else {
      number = 0;
      setActivePicture((number++));
    }
  });
};

var setActivePicture = function(count) {
  var activePicture = pictures[count];
  var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var galleryOverlayControlsLike = galleryOverlay.querySelector('.likes-count');
  var galleryOverlayControlsComments = galleryOverlay.querySelector('.comments-count');
  galleryOverlayImage.setAttribute('src', activePicture.url);
  galleryOverlayControlsLike.innerText = activePicture.likes;
  galleryOverlayControlsComments.innerText = activePicture.comments;

};

var hide = function() {
  galleryOverlay.classList.add('invisible');
};


module.exports = Gallery;
