const fs = require("fs");
const path = require('path');

/**
  * Creates an array to house the DS_Store files
  * @author Jameson Cohen
*/
let dsStoreArr = [];


//deleting all folders and files in the build folder

/**
  * Defines the directory name build
  * @author Jameson Cohen
*/
let dirName = "build";

/**
  * Creates a build folder if it not created already
  * @author Jameson Cohen
*/
if(!fs.existsSync(dirName)){
  fs.mkdirSync(dirName);
}

/**
  * Creates arrays that will contain all of the file and folder names inside the build directory
  * @author Jameson Cohen
*/
let fileNames = fs.readdirSync(dirName);
let nameArr = [];
let foldArr = [];

/**
  * Sorts all of the files and folders in the build directory into their respective arrays
  * @param file The current file or folder that is being pushed to an array
  * @author Jameson Cohen

*/
fileNames.forEach((file) => {
  if(file == ".DS_Store"){
    dsStoreArr.push(dirName + '/' + file);
  }
  else if(file.includes('.html')){
    nameArr.push(dirName + '/' + file);
  }
  else{
    foldArr.push(dirName + '/' + file);
  }
});

/**
  * Unlinks all of the html files in the build directory
  * @author Jameson Cohen
*/
for(let i = 0; i < nameArr.length; i++){
  fs.unlinkSync(nameArr[i]);
}

/**
  * Unlinks all of the files within secondary folders (css, js, images) inside the build directory
  * @author Jameson Cohen
*/
for(let i = 0; i < foldArr.length; i ++){
  let foldFiles = fs.readdirSync(foldArr[i]);
  let foldContents = [];
  foldFiles.forEach((file) => {
    foldContents.push(foldArr[i] + '/' + file);
  });
  for(let j = 0; j < foldContents.length; j++){
    fs.unlinkSync(foldContents[j]);
  }
}


//dealing with contents of the dist folder

/**
  * Defines the directory name dist
  * @author Jameson Cohen
*/
let distName = "dist";

/**
  * Creates a dist folder if it not created already
  * @author Jameson Cohen
*/
if(!fs.existsSync(distName)){
  fs.mkdirSync(distName);
}

/**
  * Creates arrays that will contain all of the file and folder names inside the dist directory
  * @author Jameson Cohen
*/
let distFiles = fs.readdirSync(distName);
let distArr = [];
let distFolds = [];

/**
  * Sorts all of the files and folders in the dist directory into their respective arrays
  * @param file The current file or folder that is being pushed to an array
  * @author Jameson Cohen
*/
distFiles.forEach((file) => {
  if(file == ".DS_Store"){
    dsStoreArr.push(distName + '/' + file);
  }
  else if(file.includes('.html')){
    distArr.push(distName + '/' + file);
  }
  else{
    distFolds.push(distName + '/' + file);
  }
});

/**
  * Unlinks all of the html files in the dist directory
  * @author Jameson Cohen
*/
for(let i = 0; i < distArr.length; i++){
  fs.unlinkSync(distArr[i]);
}

/**
  * Unlinks all of the files within secondary folders (css, js, images) inside the dist directory
  * @author Jameson Cohen
*/
for(let i = 0; i < distFolds.length; i++){
  let distFoldFiles = fs.readdirSync(distFolds[i]);
  let distContents = [];
  distFoldFiles.forEach((file) => {
    distContents.push(distFolds[i] + '/' + file);
  });
  for(let j = 0; j < distContents.length; j++){
    fs.unlinkSync(distContents[j]);
  }
}



//copying all static files from src/public into the build folder


//setTimeout allows time for all files to be deleted before creating the new ones

/**
  * setTimeout gives the precompile time to delete all the files before creating the new static files
    * Otherwise, some of the static files being created might get deleted
  * @author Jameson Cohen
*/
setTimeout(function(){

/**
  * Checks if a css folder exists inside the build directory, and if it doesn't, one gets created
  * @author Jameson Cohen
*/
  if(!foldArr.includes(dirName + '/css')){
    fs.mkdirSync(dirName + '/css');
  }

/**
  * Checks if an images folder exists inside the build directory, and if it doesn't, one gets created
  * @author Jameson Cohen
*/
  if(!foldArr.includes(dirName + '/images')){
    fs.mkdirSync(dirName + '/images');
  }

  /**
    * Checks if a js folder exists inside the build directory, and if it doesn't, one gets created
    * @author Jameson Cohen
  */
  if(!foldArr.includes(dirName + '/js')){
    fs.mkdirSync(dirName + '/js');
  }

  /**
    * Checks if a css folder exists inside the dist directory, and if it doesn't, one gets created
    * @author Jameson Cohen
    */
  if(!distFolds.includes(distName + '/css')){
    fs.mkdirSync(distName + '/css');
  }

  /**
    * Checks if an images folder exists inside the dist directory, and if it doesn't, one gets created
    * @author Jameson Cohen
  */
  if(!distFolds.includes(distName + '/images')){
    fs.mkdirSync(distName + '/images');
  }

  /**
    * Checks if a js folder exists inside the dist directory, and if it doesn't, one gets created
    * @author Jameson Cohen
  */
  if(!distFolds.includes(distName + '/js')){
    fs.mkdirSync(distName + '/js');
  }

  /**
    * Creates the necessary directory pathing and file arrays to copy the images into the build and dist directories
    * @author Jameson Cohen
  */
  let imageDir = "src/public/images";
  let imageNames = fs.readdirSync(imageDir);
  let imageArr = [];

  /**
    * Finalizes the pathing for the image files that will get copied into the build and dist directories
    * @author Jameson Cohen
  */
  imageNames.forEach((file) => {
    imageArr.push(imageDir + '/'+ file);
  });

  /**
    * Copies each image from the src public images folder to the build and dist directory image folders
    * @author Jameson Cohen

  */
  for(let i = 0; i < imageNames.length; i++){
    fs.copyFileSync(imageDir + '/' + imageNames[i], dirName + '/images/' + imageNames[i]);
    fs.copyFileSync(imageDir + '/' + imageNames[i], distName + '/images/' + imageNames[i]);
  }

  /**
    * Creates the necessary directory pathing and file arrays to copy the js into the build and dist directories
    * @author Jameson Cohen

  */
  let jsDir = "src/public/js";
  let jsNames = fs.readdirSync(jsDir);
  let jsArr = [];

  /**
    * Finalizes the pathing for the js files that will get copied into the build and dist directories
    * @author Jameson Cohen

  */
  jsNames.forEach((file) => {
    jsArr.push(jsDir + '/'+ file);
  });

  /**
    * Copies each js file from the src public js folder to the build and dist directory js folders
    * @author Jameson Cohen

  */
  for(let i = 0; i < jsNames.length; i++){
    let js_template = fs.readFileSync(jsDir + '/' + jsNames[i], 'utf8');
    fs.writeFileSync(dirName + '/js/' + jsNames[i], js_template, 'utf8');
  }
}, 1000);
