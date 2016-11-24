/**
 * Colors for graphing
 */


var colors = [
'rgb(62,116,164)',
'rgb(160,127,64)',
'rgb(26,120,7)',
'rgb(149,30,238)',
'rgb(16,69,181)',
'rgb(74,215,111)',
'rgb(206,138,126)',
'rgb(41,27,126)',
'rgb(227,172,76)',

    ];  
var mydata
/**
 * Reads data from JSON file and returns datasets for graphind
 * @return {array}  - array of datasets, split by tag
 */
function getDataSet(){
  // get data from file
   mydata= JSON.parse(log);

  // get array of distinct tags
  var tags = getTags(mydata)

  // create array of data (split by tag)
  var mydatasets = []

  for (var i = 0; i < tags.length; i++) {
    var myTag = tags[i];
    var points = filterByTag(mydata, myTag);
    var data = newData(myTag, points, colors[i])
    mydatasets.push(data);
  }
  return mydatasets;
}


/**
 * Finds set of distinct tags
 * @param  {array} data - array of data objects
 * @return {array}      - array of distinct tag names
 */
function getTags(){
  var found = {};
  var distinct = [];
  for(var i in mydata){
    var mytag = mydata[i].tag;
    if(typeof(found[mytag]) === "undefined"){
      distinct.push(mytag);
    }
    found[mytag] = 0;
    mydata[i].x = new Date(parseInt(mydata[i].x))
    }
    return distinct;
}


/**
 * Finds all data which has a certain tag
 * @param  {array}  data - all data
 * @param  {string} tag  - name of tag
 * @return {array}       - filtered data (for given tag)
 */
function filterByTag(data , tag){
  return data.filter(function (el) {
    return el.tag === tag;
  });
}


/**
 * Puts data (for one tag) into an object w configs for graphing
 * @param  {string} label   - tag name of data
 * @param  {array}  data    - objects containing x,y,tag fields
 * @param  {string} bgcolor - color of points/line
 * @return {object}         - object for one tag, contains data & visual configs 
 */
function newData(label, data, bgcolor){
  d = {
    fill: false,
    lineTension: 0.1,
    backgroundColor: bgcolor,
    borderColor: bgcolor,
    borderDashOffset: 0.0,
    pointBorderColor: "red",
    pointBackgroundColor: "red",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointRadius: 5,
    pointHitRadius: 10,
  }
  d.label = label;
  d.data = data;
  return d;
}