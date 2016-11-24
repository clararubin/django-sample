var glob=[]
/**
 * buttons that user can click on to display data over particular duration
 */
var periods = 
  [ 
    {
      "period": "hh",
      "count": 1,
      "label": "1 hour"
    },{
      "period": "DD",
      "count": 1,
      "label": "1 day"
    },{
      "period": "DD",
      "count": 10,
      "label": "10 days"
    }, {
      "period": "MM",
      "count": 1,
      "label": "1 month"
    }, {
      "period": "YYYY",
      "count": 1,
      "label": "1 year",
      "selected": true
    }, {
      "period": "YTD",
      "label": "YTD"
    }, {
      "period": "MAX",
      "label": "MAX"
    } 
  ]






// CREATE CHART
var chart = AmCharts.makeChart( "chartdiv", {
  "type": "stock",
  
  "dataSets": [],
  
  "panels": [{
    "title": "App Monitor",
    "recalculateToPercents": "never",
    
    "stockGraphs": [{
      "valueField": "value",
      "comparable": true,
      "bullet": "round",
      "compareGraphBullet" : "round"
    }],

    "stockLegend": {}
  }],

  "chartCursorSettings": {
    "valueLineEnabled": true,
    "valueLineBalloonEnabled": true,
    "bulletsEnabled" : true
  },

  "dataSetSelector": {
    "position": "left"
  },

  "periodSelector": {
    "dateFormat" : "MM-DD-YYYY HH:NN:SS",
    "position": "left",
    "inputFieldsEnabled": true,
    "periods": periods
  },

  "balloon": {
    "adjustBorderColor": true,
    "color": "#000000",
    "cornerRadius": 5,
    "fillColor": "#FFFFFF"
  }


} );

function filterByTag(data , tag){
  return data.filter(function (el) {
    return el.tag === tag;
  });
}

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
 * GET RANDOM DATA AND ADD TO DASHBOARD
 */

var numberOfDataSets = 5;
window.onload= function(){
  // import data
  mydata = myJSON.HIHI;


  var tags = getTags(mydata)


  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    populateData(tag);
  }
} 


var startDate = new Date();
startDate.setHours( 0, 0, 0, 0 );
startDate.setDate( startDate.getDate() - 10 );




function getNextData(myTag) {
  var points = filterByTag(mydata, myTag);
  for (var i = 0; i < points.length; i++) {
    var d = new Date(points[i].date)
        points[i].date  = d;

  }
    glob.push(points)

  return points;
}


function populateData(tag){
      // CREATE DATASET
      var dataset = new AmCharts.DataSet();
      dataset.title = "Dataset " + ( chart.dataSets.length + 1 );
      dataset.categoryField = "date";
      dataset.dataProvider = getNextData(tag);

      dataset.fieldMappings.push( {
        "fromField": "value",
        "toField": "value"
      } );
    

      chart.dataSets.push( dataset );
      chart.validateNow();
    } 
