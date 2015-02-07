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

	describe("should process process.argv", function () {
		var argCache;

		before(function() {
			argCache = process.argv;
			process.argv = ['node', 'index.js', 'test.bmp', 'new2.bmp'];
			if(fs.exists("new2.bmp")) {
				fs.unlinkSync("new2.bmp");
			}
			app();
		});

		after(function() {
			process.argv = argCache;
			fs.unlinkSync("new2.bmp");
		});

		it("should read new2.bmp from process.argv[2]", function () {
			expect(fs.existsSync("new2.bmp")).to.eql(true);
		});
	});
});
