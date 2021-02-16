const fs = require("fs");

let rawData = fs.readFileSync('data/clean/content.json', 'utf8');
let dataSet = JSON.parse(rawData);

let cleanData = fs.readFileSync('data/clean/sortContent.json', 'utf8');
let cleanParse = JSON.parse(cleanData);

let dirName = "build";
let fileNames = fs.readdirSync(dirName);
let nameArr = [];

fileNames.forEach((file) => {
  if(file.includes('.html')){
    nameArr.push(dirName + '/' + file);
  }
});

test('blank restaurant names', () => {
  let blankRest = 0;

  for(let i = 0; i < dataSet.length; i++){
    if (dataSet[i].Restaurant_Names == ""){
      blankRest++;
    }
  }
  expect(blankRest.toString()).toBe("0");
});

test('blank grades', () => {
  let blankGrade = 0;

  for(let i = 0; i < dataSet.length; i++){
    if (dataSet[i].Grade == ""){
      blankGrade++;
    }
  }
  expect(blankGrade.toString()).toBe("0");
});

test('blank scores', () => {
  let blankScore = 0;

  for(let i = 0; i < cleanParse.length; i++){
    if (cleanParse[i].Score == ""){
      blankScore++;
    }
  }
  expect(blankScore.toString()).toBe("0");
});

test('total number of restaurants checked', () => {
  let restCounter = 0;
  for(let i = cleanParse.length-6; i < cleanParse.length-1; i++){
    //if(cleanParse[i].AllRestaurants != ''){
      restCounter += cleanParse[i].AllRestaurants.length;
    //}
  }
  let restTot = parseInt(restCounter);
  expect(restTot).toBe(dataSet.length);
});

//test('grade counter', () => {
  let gradeArr = ['A', 'B', 'C', 'Z', 'N'];
  for(let i = 0; i < gradeArr.length; i++){
    let sumGrades = 0;
    test('grade ' + gradeArr[i] + ' counter checker', () => {
    for(let j = cleanParse.length-6; j < cleanParse.length-1; j++){
      let cP = cleanParse[j][gradeArr[i]];
      sumGrades += parseInt(cP);
    }
    let lenCP = cleanParse.length-1;
    expect(sumGrades).toBe(parseInt(cleanParse[lenCP][gradeArr[i]]));
  });
}//);

test('average scores', () => {
  let totalScore = 0;
  let totalRestNum = 0;

  for(let i = 0; i < dataSet.length; i++){
    if(dataSet[i].Score != ""){
      totalRestNum++;
      totalScore += parseInt(dataSet[i].Score);
    }
  }
  let avgScore = Math.round(10*(totalScore/totalRestNum))/10;
  expect(avgScore).toBe(cleanParse[cleanParse.length-1].AvgScore);
});

test('all zipcodes have a micro page', () => {
  let zipPages = fileNames.filter(function(file){
    let pageName = file.split('.');
    if(isNaN(parseInt(pageName[0])) == false){
      return file;
    }
  });
  let lenArr = parseInt(zipPages.length);
  expect(lenArr).toBe(cleanParse.length-6);
});

test('no data from the same restaurant is used twice', () => {
  let duplicateNum = 0;
  for (let i = 0; i<dataSet.length; i++){
    for (let j = 0; j<dataSet.length; j++){
      if (i!==j){
        if (dataSet[i].Restaurant_Name == dataSet[j].Restaurant_Name && dataSet[i].Address == dataSet[j].Address){
          duplicateNum++;
          console.log(dataSet[i]);
        }
      }
    }
  }
  expect(duplicateNum).toBe(0);
});

test('all city and borough averages are numbers/do not come out as null or NaN', () => {
  let boroughNotNums = 0;
  let cityNotNums = 0;
  for (let i = cleanParse.length-6; i<cleanParse.length-1; i++){
    if (isNaN(cleanParse[i].BoroughAvgScore)){
      boroughNotNums++;
    }
  }
  if (isNaN(cleanParse[cleanParse.length-1].CityAvgScore)){
    cityNotNums++;
  }
  expect(boroughNotNums).toBe(0);
  expect(cityNotNums).toBe(0);
});

test('all A, B, and C grades correspond to the proper range of numerical inspection scores', () => {
  let gradingMistakes = 0;
  let wrongRests = [];
  for (let i = 0; i<dataSet.length; i++){
    if (dataSet[i].Grade == "A"){
      if (dataSet[i].Score>13){
        gradingMistakes++;
        wrongRests.push(dataSet[i]);
      }
    } else if (dataSet[i].Grade == "B"){
      if (dataSet[i].Score<14 || dataSet[i].Score>27){
        gradingMistakes++;
        wrongRests.push(dataSet[i]);
      }
    } else if (dataSet[i].Grade == "C"){
      if (dataSet[i].Score<28){
        gradingMistakes++;
        wrongRests.push(dataSet[i]);
      }
    }
  }
  expect(gradingMistakes).toBe(0);
});
