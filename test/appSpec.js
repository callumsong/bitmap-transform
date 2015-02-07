/**
 * Created by kcoleman on 2/6/2015.
 */
'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var app = require('../index');

describe("app from index", function() {
	before(function() {
		if(fs.exists("new.bmp")) {
			fs.unlinkSync("new.bmp");
		}
		app("test.bmp", "new.bmp");
	});

	after(function() {
		fs.unlinkSync("new.bmp");
		fs.unlinkSync("transformed_test.bmp");
	});
	it("should take inputFileName and InputNewFileName", function() {
		expect(fs.existsSync("new.bmp")).to.eql(true);
	});
});
