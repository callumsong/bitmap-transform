# bitmap-transform
Bitmap Reader and Transform
For this assignment you will be building a Bitmap reader and transformer. It will read a Bitmap in from disk, run one or more color transforms on the bitmap and then write it out to a new file. This project will require the use of node buffers in order to manipulate binary data. Your project should include tests, as well as a Gruntfile and package.json file. Make sure to run all your code through jshint and jscs. The process will look something like this:

1. open file using fs and read it into a buffer

2. convert buffer into a Javascript Object

3. Run a transform on that Javascript Object.

4. Turn the transformed object back into a buffer.

5. Write that buffer to a new file.

To run the app: $node index.js [input file name] [output file name]

If you don't use input file name, the app uses test.bmp as a default.

If you don't use output file name, the app uses transformed_[input file name].
