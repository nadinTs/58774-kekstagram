/* global Resizer: true Cookies: true */

/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

module.exports = (function() {
  /** @enum {string} */
  var FileType = {
    'GIF': '',
    'JPEG': '',
    'PNG': '',
    'SVG+XML': ''
  };

  /** @enum {number} */
  var Action = {
    ERROR: 0,
    UPLOADING: 1,
    CUSTOM: 2
  };

  /**
   * Регулярное выражение, проверяющее тип загружаемого файла. Составляется
   * из ключей FileType.
   * @type {RegExp}
   */
  var fileRegExp = new RegExp('^image/(' + Object.keys(FileType).join('|').replace('\+', '\\+') + ')$', 'i');

  /**
   * @type {Object.<string, string>}
   */
  var filterMap;

  /**
   * Объект, который занимается кадрированием изображения.
   * @type {Resizer}
   */
  var currentResizer;

  /**
   * Удаляет текущий объект {@link Resizer}, чтобы создать новый с другим
   * изображением.
   */
  var cleanupResizer = function() {
    if (currentResizer) {
      currentResizer.remove();
      currentResizer = null;
    }
  };

  /**
   * Ставит одну из трех случайных картинок на фон формы загрузки.
   */
  var updateBackground = function() {
    var images = [
      'img/logo-background-1.jpg',
      'img/logo-background-2.jpg',
      'img/logo-background-3.jpg'
    ];

    var backgroundElement = document.querySelector('.upload');
    var randomImageNumber = Math.round(Math.random() * (images.length - 1));
    backgroundElement.style.backgroundImage = 'url(' + images[randomImageNumber] + ')';
  };

  /**
   * Проверяет, валидны ли данные, в форме кадрирования.
   * @return {boolean}
   */

  var resizeX = document.getElementById('resize-x');
  var resizeY = document.getElementById('resize-y');
  var resizeSize = document.getElementById('resize-size');
  var resizeFwd = document.getElementById('resize-fwd');
  var uploadResize = document.forms['upload-resize'];
  var sumX, sumY;

  var resizeFormIsValid = function() {
    var sizeWidth = currentResizer._image.naturalWidth;
    var sizeHeight = currentResizer._image.naturalHeight;
    sumX = Number(resizeSize.value) + Number(resizeX.value);
    sumY = Number(resizeSize.value) + Number(resizeY.value);

    if (sumX > sizeWidth || sumY > sizeHeight || resizeX.value < 0 || resizeY.value < 0) {
      resizeFwd.setAttribute('disabled', 'disabled');
    } else {
      resizeFwd.removeAttribute('disabled');
      return true;
    }
    return false;
  };
  uploadResize.addEventListener('input', resizeFormIsValid);
  uploadResize.addEventListener('change', resizeFormIsValid);


  var syncFormWithResizer = function() {
    if (currentResizer) {
      var data = currentResizer.getConstraint();

      if (data) {
        resizeX.value = Math.floor(data.x);
        resizeY.value = Math.floor(data.y);
        resizeSize.value = data.side;
      }
    }
  };

  window.addEventListener('resizerchange', syncFormWithResizer);

  uploadResize.addEventListener('input', function(evt) {
    var curX = currentResizer.getConstraint().x;
    var curY = currentResizer.getConstraint().y;
    var curSide = currentResizer.getConstraint().side;
    var newX, newY, newSide;

    switch (evt.target.id) {
      case 'resize-x':
        newX = Number(resizeX.value);
        break;
      case 'resize-y':
        newY = Number(resizeY.value);
        break;
      case 'resize-size':
        newSide = Number(resizeSize.value);
        var diffSide = newSide - curSide;
        newX = curX - diffSide / 2;
        newY = curY - diffSide / 2;
        break;
    }
    currentResizer.setConstraint(newX, newY, newSide);
    syncFormWithResizer();
  }, true);

  /**
   * Форма загрузки изображения.
   * @type {HTMLFormElement}
   */
  var uploadForm = document.forms['upload-select-image'];


  /**
   * Форма кадрирования изображения.
   * @type {HTMLFormElement}
   */
  var resizeForm = document.forms['upload-resize'];

  /**
   * Форма добавления фильтра.
   * @type {HTMLFormElement}
   */
  var filterForm = document.forms['upload-filter'];

  /**
   * @type {HTMLImageElement}
   */
  var filterImage = filterForm.querySelector('.filter-image-preview');

  /**
   * @type {HTMLElement}
   */
  var uploadMessage = document.querySelector('.upload-message');

  /**
   * @param {Action} action
   * @param {string=} message
   * @return {Element}
   */
  var showMessage = function(action, message) {
    var isError = false;

    switch (action) {
      case Action.UPLOADING:
        message = message || 'Кексограмим&hellip;';
        break;

      case Action.ERROR:
        isError = true;
        message = message || 'Неподдерживаемый формат файла<br> <a href="' + document.location + '">Попробовать еще раз</a>.';
        break;
    }

    uploadMessage.querySelector('.upload-message-container').innerHTML = message;
    uploadMessage.classList.remove('invisible');
    uploadMessage.classList.toggle('upload-message-error', isError);
    return uploadMessage;
  };

  var hideMessage = function() {
    uploadMessage.classList.add('invisible');
  };

  /**
   * Обработчик изменения изображения в форме загрузки. Если загруженный
   * файл является изображением, считывается исходник картинки, создается
   * Resizer с загруженной картинкой, добавляется в форму кадрирования
   * и показывается форма кадрирования.
   * @param {Event} evt
   */
  uploadForm.addEventListener('change', function(evt) {
    var element = evt.target;
    if (element.id === 'upload-file') {
      // Проверка типа загружаемого файла, тип должен быть изображением
      // одного из форматов: JPEG, PNG, GIF или SVG.
      if (fileRegExp.test(element.files[0].type)) {
        var fileReader = new FileReader();

        showMessage(Action.UPLOADING);

        fileReader.addEventListener('load', function() {
          cleanupResizer();

          currentResizer = new Resizer(fileReader.result);
          currentResizer.setElement(resizeForm);
          uploadMessage.classList.add('invisible');

          uploadForm.classList.add('invisible');
          resizeForm.classList.remove('invisible');

          hideMessage();

          syncFormWithResizer();
        });

        fileReader.readAsDataURL(element.files[0]);
      } else {
        // Показ сообщения об ошибке, если формат загружаемого файла не поддерживается
        showMessage(Action.ERROR);
      }
    }
  });

  /**
   * Обработка сброса формы кадрирования. Возвращает в начальное состояние
   * и обновляет фон.
   * @param {Event} evt
   */
  resizeForm.addEventListener('reset', function(evt) {
    evt.preventDefault();

    cleanupResizer();
    updateBackground();

    resizeForm.classList.add('invisible');
    uploadForm.classList.remove('invisible');
  });

  /**
   * Обработка отправки формы кадрирования. Если форма валидна, экспортирует
   * кропнутое изображение в форму добавления фильтра и показывает ее.
   * @param {Event} evt
   */
  resizeForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    if (resizeFormIsValid()) {
      var image = currentResizer.exportImage().src;

      var thumbnails = filterForm.querySelectorAll('.upload-filter-preview');
      for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].style.backgroundImage = 'url(' + image + ')';
      }

      filterImage.src = image;

      resizeForm.classList.add('invisible');
      filterForm.classList.remove('invisible');
    }
  });

  /**
   * Сброс формы фильтра. Показывает форму кадрирования.
   * @param {Event} evt
   */
  filterForm.addEventListener('reset', function(evt) {
    evt.preventDefault();

    filterForm.classList.add('invisible');
    resizeForm.classList.remove('invisible');
  });

  /**
   * Отправка формы фильтра. Возвращает в начальное состояние, предварительно
   * записав сохраненный фильтр в cookie.
   * @param {Event} evt
   */
  var uploadFilter;
  var now = new Date();
  var year = now.getFullYear();
  var bd = new Date(year, 11, 9);
  var oldyear = new Date(year - 1, 11, 9);
  var day;
  if ((now - bd) < 0) {
    day = Math.ceil((now - oldyear) / (1000 * 60 * 60 * 24));
  } else {
    day = Math.ceil((now - bd) / (1000 * 60 * 60 * 24));
  }
  filterForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    cleanupResizer();
    updateBackground();

    filterForm.classList.add('invisible');
    uploadForm.classList.remove('invisible');
    Cookies.set('upload-filter', uploadFilter, {expires: day});
  });
  /**
   * Обработчик изменения фильтра. Добавляет класс из filterMap соответствующий
   * выбранному значению в форме.
   */

  filterImage.className = 'filter-image-preview ' + Cookies.get('upload-filter');

  filterForm.addEventListener('change', function() {
    if (!filterMap) {
      // Ленивая инициализация. Объект не создается до тех пор, пока
      // не понадобится прочитать его в первый раз, а после этого запоминается
      // навсегда.
      filterMap = {
        'none': 'filter-none',
        'chrome': 'filter-chrome',
        'sepia': 'filter-sepia',
        'marvin': 'filter-marvin'
      };
    }

    var selectedFilter = [].filter.call(filterForm['upload-filter'], function(item) {
      return item.checked;
    })[0].value;

    // Класс перезаписывается, а не обновляется через classList потому что нужно
    // убрать предыдущий примененный класс. Для этого нужно или запоминать его
    // состояние или просто перезаписывать.
    filterImage.className = 'filter-image-preview ' + filterMap[selectedFilter];
    uploadFilter = filterMap[selectedFilter];
  });

  cleanupResizer();
  updateBackground();
})();
