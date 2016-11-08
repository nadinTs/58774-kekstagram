/*eslint no-unused-vars: 0*/

'use strict';

var resizer = require('../js/resizer.js');
var upload = require('../js/upload.js');
var load = require('../js/load.js');
var renderPictures = require('../js/pictures.js');

var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';

load(PICTURE_LOAD_URL, renderPictures);
