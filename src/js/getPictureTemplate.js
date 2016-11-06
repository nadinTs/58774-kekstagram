'use strict';
var getPictureTemplate = function (el) {
  filter.classList.add('hidden');

  filter.classList.remove('hidden');

  var pictureTemplate = templateContainer.cloneNode(true);
  var imgItem = pictureTemplate.querySelector('img');
  var link = pictureTemplate.querySelector('a.picture');

  pictureTemplate.querySelector('.picture-comments').textContent = el.comments;
  pictureTemplate.querySelector('.picture-likes').textContent = el.likes;

  var newImg = new Image(182, 182);

  newImg.onerror = function () {
    link.classList.add('picture-load-failure');
  };

  newImg.src = el.url;
  link.replaceChild(newImg, imgItem);

  return pictureTemplate;
};

module.exports =  getPictureTemplate;
