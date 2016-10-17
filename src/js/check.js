'use strict';

window.getMessage = getMessage;

function getMessage(a, b) {
  if ( typeof a === 'boolean') {
    if (a === true) {
      return ('Переданное GIF-изображение анимировано и содержит ' + b + ' кадров');
    } else {
      return 'Переданное GIF-изображение не анимировано';
    }
  } else if (typeof a === 'number') {
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';
  } else if (Array.isArray(a) === true) {
    if (Array.isArray(b) === true) {
      if (a.length === b.length ) {
        var arr = a.map(function(value, index) {
          return value * b[index];
        });
        var artifactsSquare = arr.reduce(function(x, y) {
          return x + y;
        });
        return 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
      } else {
        return false;
      }
    } else {
      var amountOfRedPoints = 0;
      for (var i = 0; i < a.length; i++) {
        amountOfRedPoints = amountOfRedPoints + a[i];
      }
      return 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
    }
  }
  return false;
}
