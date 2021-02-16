const fs = require('fs');

/**
  * Defines the array that will be used to compile all of our NYC Restaurant data
  * @author Jameson Cohen
*/
let zipcodes = [];

/**
  * Reads the raw CSV data and splits it up so that it can be easily transformed into a JSON file
  * @author Jameson Cohen
*/
let peeps_csv = fs.readFileSync('data/original/restaurantData.csv', 'utf8');
let peeps = peeps_csv.split("\n");

/**
  * Defines the arrays that will be used to track all of the data that has been checked so that there are no duplicates
  * @author Jameson Cohen
*/
let restAllNames = [];
let restAllAdds = [];

/**
  * Works through and compiles all of our raw data into a zip object that gets pushed to the zipcode array
  * @author Jameson Cohen
*/
for(let peep = 1; peep < peeps.length; peep++){
  let zipcodeInfo = peeps[peep].split(',');
  let zipNextInfo = '';
  if(peep < peeps.length-1){
    zipNextInfo = peeps[peep+1].split(',');
  }
  else{
    zipNextInfo = peeps[1].split(',');
  }
  if(!restAllNames.includes(zipcodeInfo[1]) && !restAllAdds.includes(zipcodeInfo[3] + " " + zipcodeInfo[4])
    && !isNaN(zipcodeInfo[5]) && !isNaN(zipcodeInfo[8]) && zipcodeInfo[5].length == 5 && zipcodeInfo[5] != "" && zipcodeInfo[8] != "" && zipcodeInfo[9] != ""){
    let zip = {};
    restAllNames.push(zipcodeInfo[1]);
    restAllAdds.push(zipcodeInfo[3] + " " + zipcodeInfo[4]);
    if(zipcodeInfo[2] == "0"){
      if(zipcodeInfo[5] == "10166" || zipcodeInfo[5] == "10168"|| zipcodeInfo[5] == "10285"){
        zipcodeInfo[2] = "Manhattan";
      }
      else if(zipcodeInfo[5] == "11451"){
        zipcodeInfo[2] = "Queens";
      }
      else if(zipcodeInfo[5] == "11249"){
        zipcodeInfo[2] = "Brooklyn";
      }
    }
    zip['Restaurant_Name'] = zipcodeInfo[1];
    zip['Zipcode'] = zipcodeInfo[5];
    zip['Grade'] = zipcodeInfo[9];
    zip['Score'] = zipcodeInfo[8];
    zip['Cuisine'] = zipcodeInfo[7];
    zip['Borough'] = zipcodeInfo[2];
    zip['Address'] = zipcodeInfo[3] + " " + zipcodeInfo[4];
    zipcodes.push(zip);
  }
};//);

/**
  * Corrects any restaurants that have the wrong grade for the numerical score they were given
  * @author Jameson Cohen
*/
for (let i = 0; i<zipcodes.length; i++){
  if (zipcodes[i].Grade == "A"){
    if (zipcodes[i].Score>13 && zipcodes[i].Score<28){
      zipcodes[i].Grade = "B";
    } else if (zipcodes[i].Score>=28){
      zipcodes[i].Grade = "C";
    }
  } else if (zipcodes[i].Grade == "B"){
    if (zipcodes[i].Score<14){
      zipcodes[i].Grade = "A";
    } else if (zipcodes[i].Score>=28){
      zipcodes[i].Grade = "C";
    }
  } else if (zipcodes[i].Grade == "C"){
    if (zipcodes[i].Score<28 && zipcodes[i].Score>=14){
      zipcodes[i].Grade = "B";
    } else if (zipcodes[i].Score<14){
      zipcodes[i].Grade = "A";
    }
  }
}

/**
  * Writes the compiled data into a content.JSON file
  * @author Jameson Cohen  
*/
fs.writeFileSync('data/clean/content.json', JSON.stringify(zipcodes), 'utf8');
