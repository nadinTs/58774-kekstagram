'use strict';

window.getMessage = getMessage;

function getMessage(a, b) {
  var i;
  if ( typeof a === 'boolean') {
    if (a === true) {
      return ('Переданное GIF-изображение анимировано и содержит ' + b + 'кадров');
    } else {
      return ('Переданное GIF-изображение не анимировано');
    }
  } else if (typeof a === 'number') {
    return ('Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов');
  } else if (Array.isArray(a) === true) {
    if (Array.isArray(b) === true) {
      var artifactsSquare = 0;
      for (i = 0; i < a.length; i++) {
        artifactsSquare = artifactsSquare + a[i] * b[i];
      }
      return ('Общая площадь артефактов сжатия: пикселей ' + artifactsSquare);
    } else {
      var amountOfRedPoints = 0;
      for (i = 0; i < a.length; i++) {
        amountOfRedPoints = amountOfRedPoints + a[i];
      }
      return ('Количество красных точек во всех строчках изображения: ' + amountOfRedPoints);
    }
  }
  return false;
}
