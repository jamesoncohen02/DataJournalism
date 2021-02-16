
/**
 * Accesses all the path elements on the SVG map for editing and customizable purposes
 * @author Jameson Cohen
 */
const zipLinks = document.getElementsByClassName("zip-link-item");


/**
 * Inserts a link into each SVG path element on the map that corresponds to the proper zipcode micropage
 * @author Jameson Cohen
 */
for (let i = 0; i<zipLinks.length; i++){
  if (zipLinks[i].childNodes[0].id.includes("_")){
    zipLinks[i].setAttribute("href", zipLinks[i].childNodes[0].id.slice(0, zipLinks[i].childNodes[0].id.indexOf("_")) + ".html");

  } else{
  zipLinks[i].setAttribute("href", zipLinks[i].childNodes[0].id + ".html");
}
}
