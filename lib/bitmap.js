/**
 * Created by kcoleman on 2/5/2015.
 */
'use strict';

var bitmap = exports = module.exports = {}; // jshint ignore:line

var fs = require('fs');

var buff = null;
var bitmapHeader = {};

bitmap.readBitmap = function(fileName) {
	buff = fs.readFileSync(fileName);
	getBitmapHeader();
};

bitmap.writeBitmap = function(fileName) {
	fs.writeFileSync(fileName, buff);
};

var getBitmapHeader = function () {
	bitmapHeader.type = buff.toString('utf-8', 0, 2);
	bitmapHeader.fileSize = buff.readUInt32LE(2);
	bitmapHeader.reservedBytes = buff.readUInt32LE(6);
	bitmapHeader.startOfPixels = buff.readUInt32LE(10);
	bitmapHeader.dibHeaderSize = buff.readUInt32LE(14);
	bitmapHeader.width = buff.readInt32LE(18);
	bitmapHeader.height = buff.readInt32LE(22);
	bitmapHeader.colorDepth = buff.readUInt16LE(28);
	bitmapHeader.paletteSize = buff.readUInt32LE(46);

	if(bitmapHeader.type === "BM") {
		bitmapHeader.paletteOffset = 54;
	};
};

bitmap.getPalette = function(){
	var palette = [];
	for(var i = 0; i < bitmapHeader.paletteSize; i++) {
		var offset = bitmapHeader.paletteOffset + (i * 4);
		palette.push([
			buff.readUInt8(offset),
			buff.readUInt8(offset + 1),
			buff.readUInt8(offset + 2),
			buff.readUInt8(offset + 3)
		])
	}
	return palette
};

bitmap.updatePalette = function(transform) {
	for(var i = 0; i < bitmapHeader.paletteSize; i++) {
		var offset = bitmapHeader.paletteOffset + (i * 4);
		var paletteColor = buff.slice(offset, offset + 4);
		paletteColor = transform(paletteColor);
	};
};

bitmap.transformNegative8 = function(colorBuffer) {
	for(var i = 0; i < colorBuffer.length - 1; i++) {
		var channel = colorBuffer.readUInt8(i);
		channel = 255 - channel;
		colorBuffer.writeUInt8(channel, i);
	}
}


