'use strict';

require('../js/resizer.js');
require('../js/upload.js');
var load = require('../js/load.js');
var renderPictures = require('../js/pictures.js');

var PICTURE_LOAD_URL = 'http://localhost:1507/api/pictures';

load(PICTURE_LOAD_URL, renderPictures);
