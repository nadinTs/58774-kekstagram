'use strict';

window.getMessage = getMessage;

function getMessage(a, b) {
  var i;
  if ( typeof a === 'boolean') {
    if (a === true) {
      return ('Переданное GIF-изображение анимировано и содержит ' + b + ' кадров');
    } else {
      return ('Переданное GIF-изображение не анимировано');
    }
  } else if (typeof a === 'number') {
    return ('Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов');
  } else if (Array.isArray(a) === true) {
    if (Array.isArray(b) === true) {
      var rowsA = a.length,
        rowsB = b.length,
        artifactsSquare = 0;
      if (rowsB === rowsA ) {
        for (var j = 0; j < rowsA; j++) {
          artifactsSquare += a[j] * b[j];
          console.log(artifactsSquare);
        }
        return ('Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей');
      } else {
        return false;
      }
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
