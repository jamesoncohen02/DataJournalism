# Data Journalism Project: Eat or Retreat

This is a Data Journalism website that gives NYC tourists and locals alike a deep look at the quality and cleanliness of restaurants around New York City, particularly how these factors differ, on average, by zip code. We hope the manner in which this data is consolidated and displayed to viewers will help them make informed choices about the places at which they choose to dine.

## How to Locally Build the Website (If You Have All the Backend Files)
*Note: You will at the very least need all the .ejs and .less files, the .csv data files, and the various JS files in the util folder. Additionally, you will need to have set up a build and dist folder with, at the very least, an empty css folder and an images folder with the necessary images for this site within those build and dist folders.*
1. Make sure that you have downloaded Node.js. In order to do so, click [here](https://nodejs.org/en/download/).
2. Install the fs, ejs, LESS, jsHint, Jest, jsDoc, minify, and uglify dependencies by entering this project folder and typing each of the following into the Terminal command line:
    * `npm install fs --save`
    * `npm install ejs --save`
    * `npm install less --save`
    * `npm install jshint --save`
    * `npm install jest --save`
    * `npm install jsdoc --save`
    * `npm install html-minifier --save`
    * `npm install uglify-js --save`
3. Run the NPM Pipeline by entering the project folder and typing the following text into your command line. These two simple commands will then run various other commands, which can be founded in the scripts tag in package.json, namely those that will clear the contents of the build and dist folders by precompiling, compile the EJS templates and LESS code into HTML and CSS, lint/check the JS code, run Jest tests on the data, create JS documentation, minify and uglify the JS, HTML, and CSS code, and deploy the website to GitHub pages.
    * `npm run build`
    * `npm run publish`
