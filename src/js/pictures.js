'use strict';

(function() {
  var container = document.querySelector('.pictures');
  var filter = document.querySelector('.filters');
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';
  var load = function(url, callback, callbackName) {
    if (!callbackName) {
      callbackName = 'cb' + Date.now();
    }
    window[callbackName] = function(data) {
      callback(data);
    };
    var script = document.createElement('script');
    script.src = url + '?callback=' + callbackName;
    document.body.appendChild(script);
  };

  var hiddenFilter = function() {
    filter.classList.add('hidden');
  };

  var getPictureTemplate = function(el) {
    hiddenFilter();

    filter.classList.remove('hidden');

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

  var renderPictures = function(pictures) {
    pictures.forEach(function(elem) {
      container.appendChild(getPictureTemplate(elem));
    });
  };

  load(PICTURE_LOAD_URL, renderPictures);
})();
