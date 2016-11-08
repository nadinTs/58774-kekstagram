'use strict';
var filter = document.querySelector('.filters');
var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;

var getPictureTemplate = function(el) {
  filter.classList.remove('hidden');
  filter.classList.add('hidden');

  var pictureTemplate = templateContainer.cloneNode(true);
  var imgItem = pictureTemplate.querySelector('img');
  var link = pictureTemplate.querySelector('a.picture');

  pictureTemplate.querySelector('.picture-comments').textContent = el.comments;
  pictureTemplate.querySelector('.picture-likes').textContent = el.likes;

  var newImg = new Image(182, 182);
  newImg.onload = function(evt) {
    imgItem.src = evt.target.src;
    imgItem.width = evt.target.width;
    imgItem.height = evt.target.height;
  };
  newImg.onerror = function() {
    link.classList.add('picture-load-failure');
  };

  newImg.src = el.url;

  return pictureTemplate;
};

module.exports = getPictureTemplate;
