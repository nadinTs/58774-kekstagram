'use strict';

var Gallery = require('../js/gallery.js');
var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;


var Picture = function(data, pictureIndex) {
  this.data = data;
  this.element = templateContainer.cloneNode(true);
  this.link = this.element.querySelector('a.picture');

  var imgItem = this.element.querySelector('img');
  var self = this;

  this.element.querySelector('.picture-comments').textContent = data.comments;
  this.element.querySelector('.picture-likes').textContent = data.likes;
  this.link.setAttribute('data-id', pictureIndex);

  var newImg = new Image(182, 182);

  newImg.onload = function(evt) {
    imgItem.src = evt.target.src;
    imgItem.width = evt.target.width;
    imgItem.height = evt.target.height;
  };

  newImg.onerror = function() {
    self.link.classList.add('picture-load-failure');
  };

  newImg.src = data.url;

  this.link.addEventListener('click', Picture.prototype.open);
};

Picture.prototype.open = function() {
  Gallery.show(this.getAttribute('data-id'));
};

Picture.prototype.remove = function() {
  this.link.removeEventListener('click', Picture.prototype.open);
};

module.exports = Picture;
