const fs = require('fs');

/**
  * Defines the arrays that will be used to compile all of our NYC Restaurant data
  * @author Jameson Cohen
*/

let allZipCodes = [];

let allBoroughs = [];

let eachBoroughData = [];

let eachZipData = [];

/**
  * Defines all of the variables (and some more arrays) that will be used to define all of the object properties within our large data arrays
  * @author Jameson Cohen
*/

let totalA = 0;
let totalB = 0;
let totalC = 0;
let totalN = 0;
let totalZ = 0;
let totalP = 0;
let totalScore = 0;
let totalNum = 0;
let bronxAvg = 0;
let brooklynAvg = 0;
let manhattanAvg = 0;
let statenIslandAvg = 0;
let queensAvg = 0;

/**
  * Read and parse the data that will be further cleansed
  * @author Jameson Cohen
*/

let rawData = fs.readFileSync('data/clean/content.json', 'utf8');

let dataSet = JSON.parse(rawData);

/**
  * Creates the array with all of the various zip codes in NYC that will be used to make each micro page data object
  * @author Jameson Cohen
*/
for(let i = 0; i < dataSet.length; i++){
  if (!allZipCodes.includes(dataSet[i].Zipcode)){
    allZipCodes.push(dataSet[i].Zipcode);
  }
}

/**
  * Creates the array with all five boroughs in NYC that will be used along with the macro and micro page data objects
  * @author Jameson Cohen
*/
for(let i = 0; i < dataSet.length; i++){
  if (!allBoroughs.includes(dataSet[i].Borough)){
    allBoroughs.push(dataSet[i].Borough);
  }
}

allBoroughs.sort();

/**
  * Defines and pushes each zip code's object with properties to the eachZipData array
  * @author Jameson Cohen
*/
for (let i = 0; i<allZipCodes.length; i++){
  let newObj = {
    "Zipcode": allZipCodes[i],
    "Borough": "",
    "A": 0,
    "B": 0,
    "C": 0,
    "Z": 0,
    "N": 0,
    "P": 0,
    "AvgScore": 0,
    "BoroughAvgScore": 0,
    "CityAvgScore": 0
  }
  eachZipData.push(newObj);
}

/**
  * Defines and pushes each borough's object with properties to the eachBoroughData array
  * @author Jameson Cohen
*/
for (let i = 0; i<allBoroughs.length; i++){
  let newObj = {
    "Zipcode": "NA",
    "Borough": allBoroughs[i],
    "A": 0,
    "B": 0,
    "C": 0,
    "Z": 0,
    "N": 0,
    "P": 0,
    "AvgScore": 0,
    "BoroughAvgScore": 0,
    "CityAvgScore": 0,
    "AllRestaurants": [],
  }
  eachBoroughData.push(newObj);
}

/**
  * Finalizes each zip code's object data by checking the data file and assigning values to each property's key in the eachZipData array
  * @author Jameson Cohen
*/
for(let i = 0; i<eachZipData.length; i++){
  let borough = "";
  let countA = 0;
  let countB = 0;
  let countC = 0;
  let countZ = 0;
  let countN = 0;
  let countP = 0;
  let zipScore = 0;
  let zipNumber = 0;
  for(let j = 0; j<dataSet.length; j++){
    if(eachZipData[i].Zipcode == dataSet[j].Zipcode && dataSet[j].Restaurant_Names != ''){
      if(dataSet[j].Score != ""){
        zipNumber++;
        zipScore += parseInt(dataSet[j].Score);
      }
      borough = dataSet[j].Borough;
      if(dataSet[j].Grade == "A"){
        countA++;
      }
      else if(dataSet[j].Grade == "B"){
        countB++;
      }
      else if(dataSet[j].Grade == "C"){
        countC++;
      }
      else if(dataSet[j].Grade == "Z"){
        countZ++;
      }
      else if(dataSet[j].Grade == "N"){
        countN++;
      }
      else if(dataSet[j].Grade == "P"){
        countP++;
      }
    }
  }
  eachZipData[i].Borough = borough;
  eachZipData[i].A = countA;
  eachZipData[i].B = countB;
  eachZipData[i].C = countC;
  eachZipData[i].Z = countZ;
  eachZipData[i].N = countN;
  eachZipData[i].P = countP;
  eachZipData[i].AvgScore = Math.round(10*(zipScore/zipNumber))/10;
  totalScore += zipScore;
  totalNum += zipNumber;
}

/**
  * Sorts the eachZipData array so that it displays the zip codes in numerical order
  * @param a the current value being sorted
  * @param b the value that a is being compared to and sorted against
  * @return the sorted array
  * @author Jameson Cohen
*/

eachZipData.sort(function(a, b){
  let zip1 = parseInt(a.Zipcode);
  let zip2 = parseInt(b.Zipcode);
  return zip1 - zip2
});

/**
  * Sorts the eachZipData array so that it displays in alphabetical order by borough, and within each borough, the zip codes are sorted numerical order
  * @param a the current value being sorted
  * @param b the value that a is being compared to and sorted against
  * @return the sorted array
  * @author Jameson Cohen
*/
eachZipData.sort(function(a, b){
  let bor1 = a.Borough;
  let bor2 = b.Borough;
  if (bor1 < bor2){return -1}
  if (bor1 > bor2){return 1}
  return 0;
});

/**
  * Finalizes each zip borough's object data by checking the data file and assigning values to each property's key in the eachBoroughData array and adds it to the eachZipData array
  * @author Jameson Cohen
*/
for(let i = 0; i<eachBoroughData.length; i++){
  let countA = 0;
  let countB = 0;
  let countC = 0;
  let countZ = 0;
  let countN = 0;
  let countP = 0;
  let boroughScore = 0;
  let boroughNumber = 0;
  let restNames = [];
  for(let j = 0; j<dataSet.length; j++){
    if(eachBoroughData[i].Borough == dataSet[j].Borough && dataSet[j].Restaurant_Names != ''){

      if(dataSet[j].Score != ""){
        boroughNumber++;
        boroughScore += parseInt(dataSet[j].Score);
      }
      if(dataSet[j].Grade == "A"){
        countA++;
      }
      else if(dataSet[j].Grade == "B"){
        countB++;
      }
      else if(dataSet[j].Grade == "C"){
        countC++;
      }
      else if(dataSet[j].Grade == "Z"){
        countZ++;
      }
      else if(dataSet[j].Grade == "N"){
        countN++;
      }
      else if(dataSet[j].Grade == "P"){
        countP++;
      }
      restNames.push(dataSet[j].Restaurant_Name);
    }
  }
  eachBoroughData[i].A = countA;
  eachBoroughData[i].B = countB;
  eachBoroughData[i].C = countC;
  eachBoroughData[i].Z = countZ;
  eachBoroughData[i].N = countN;
  eachBoroughData[i].P = countP;
  totalA += countA;
  totalB += countB;
  totalC += countC;
  totalZ += countZ;
  totalN += countN;
  totalP += countP;
  eachBoroughData[i].AllRestaurants = restNames;
  eachBoroughData[i].AvgScore = Math.round(10*(boroughScore/boroughNumber))/10;

  if (eachBoroughData[i].Borough == "Bronx"){
    bronxAvg = Math.round(10*(boroughScore/boroughNumber))/10;
  } else if (eachBoroughData[i].Borough == "Brooklyn"){
    brooklynAvg = Math.round(10*(boroughScore/boroughNumber))/10;
  } else if (eachBoroughData[i].Borough == "Manhattan"){
    manhattanAvg = Math.round(10*(boroughScore/boroughNumber))/10;
  } else if (eachBoroughData[i].Borough == "Staten Island"){
    statenIslandAvg = Math.round(10*(boroughScore/boroughNumber))/10;
  } else if (eachBoroughData[i].Borough == "Queens"){
    queensAvg = Math.round(10*(boroughScore/boroughNumber))/10;
  }

  eachZipData.push(eachBoroughData[i]);
}

/**
  * Defines NYC"s (the macro) object with properties
  * @author Jameson Cohen
*/
let macroObj = {
  "Zipcode": "All",
  "Borough": "All",
  "A": totalA,
  "B": totalB,
  "C": totalC,
  "Z": totalZ,
  "N": totalN,
  "P": totalP,
  "AvgScore": Math.round(10*(totalScore/totalNum))/10,
  "BoroughAvgScore": "NA",
  "CityAvgScore": Math.round(10*(totalScore/totalNum))/10,
}

/**
  * Defines all of the average score data
  * @author Jameson Cohen
*/
for (let i = 0; i<eachZipData.length; i++){
  eachZipData[i].CityAvgScore = Math.round(10*(totalScore/totalNum))/10;
  if (eachZipData[i].Borough == "Bronx"){
    eachZipData[i].BoroughAvgScore = bronxAvg;
  } else if (eachZipData[i].Borough == "Brooklyn"){
    eachZipData[i].BoroughAvgScore = brooklynAvg;
  } else if (eachZipData[i].Borough == "Manhattan"){
    eachZipData[i].BoroughAvgScore = manhattanAvg;
  } else if (eachZipData[i].Borough == "Staten Island"){
    eachZipData[i].BoroughAvgScore = statenIslandAvg;
  } else if (eachZipData[i].Borough == "Queens"){
    eachZipData[i].BoroughAvgScore = queensAvg;
  }
}

/**
  * Pushes the macro NYC object data into the eachZipData array so that all of the data is available for use in one single array
  * @author Jameson Cohen
*/
eachZipData.push(macroObj);

/**
  * Writes the sorted data file to a sortContent.json file
  * @author Jameson Cohen
*/
fs.writeFileSync('data/clean/sortContent.json', JSON.stringify(eachZipData), 'utf8');
