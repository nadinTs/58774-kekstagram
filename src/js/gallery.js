'use strict';

var Gallery = function() {
  this.galleryOverlay = document.querySelector('.gallery-overlay');
  this.galleryOverlayClose = this.galleryOverlay.querySelector('.gallery-overlay-close');
  this.galleryOverlayImage = this.galleryOverlay.querySelector('.gallery-overlay-image');


  this.picturesDom = document.querySelectorAll('.picture');
};

Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

Gallery.prototype.show = function(number) {
  var self = this;

  this.galleryOverlay.classList.remove('invisible');

  this.galleryOverlayClose.onclick = function() {
    self.hide();
  };
  this.setActivePicture(number);

  this.galleryOverlay.onclick = function() {
    var nextPicture = (+self.activePicture + 1) % self.pictures.length;

    self.setActivePicture(nextPicture);
  };

};

Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = number;
  this.galleryOverlayImage.src = this.pictures[number].url;
  this.galleryOverlayControlsLike = this.galleryOverlay.querySelector('.likes-count');
  this.galleryOverlayControlsComments = this.galleryOverlay.querySelector('.comments-count');
  this.galleryOverlayControlsLike.innerText = this.pictures[number].likes;
  this.galleryOverlayControlsComments.innerText = this.pictures[number].comments;

};

Gallery.prototype.hide = function() {
  this.galleryOverlay.classList.add('invisible');
  this.galleryOverlayClose.onclick = null;
  this.galleryOverlay.onclick = null;
};
module.exports = new Gallery();

