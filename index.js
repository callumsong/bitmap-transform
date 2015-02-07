/**
 * Created by kcoleman on 2/5/2015.
 */
'use strict';

var bitmap = require('./lib/bitmap');

var fileName = process.argv[2] || "test.bmp";
var newFileName = process.argv[3] || "transformed_" + fileName;


bitmap.readBitmap(fileName);
console.log("Opening file " + fileName + ".");
bitmap.updatePalette(bitmap.transformNegative8);
console.log("Updating palette.");
bitmap.writeBitmap(newFileName);
console.log("Writing file " + newFileName);

//console.log(bitmap.getPalette());
