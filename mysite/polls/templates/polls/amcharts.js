

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






/**
 * GET RANDOM DATA AND ADD TO DASHBOARD
 */


var numberOfDataSets = 30;
window.onload= function(){
  for (var i = 0; i < numberOfDataSets; i++) {
    populateData();
  }
} 


var startDate = new Date();
startDate.setHours( 0, 0, 0, 0 );
startDate.setDate( startDate.getDate() - 10 );


// jQuery( ".btn-dataset-add" ).on( "click", function() {



// TEMPORARY RANDOM DATA GENERATOR
function generateChartData( data, field ) {
  var ret = [];
  for (var i = 0; i < 10; i++) {
    
    var randVal = Math.floor(Math.random() * (12));
    ret.push({
      "value": randVal,
    });
  }

  function compare(a,b) {
    if (a.value < b.value)
      return -1;
    if (a.value > b.value)
      return 1;
    return 0;
  }

  ret.sort(compare);

  for (var i = 0; i < ret.length; i++) {
    var newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + i );
    ret[i]["date"] = newDate;
  }

  return ret;
}


function populateData(){
      // CREATE DATASET
      var dataset = new AmCharts.DataSet();
      dataset.title = "Dataset " + ( chart.dataSets.length + 1 );
      dataset.dataProvider = generateChartData();
      dataset.categoryField = "date";

      // LOOP THROUGH PANELS (only 1 panel exists)

      for ( pan in chart.panels ) {
        // LOOP THROUGH PANEL GRAPHS
        for ( gra in chart.panels[pan].stockGraphs ) {
          var valueField = chart.panels[pan].stockGraphs[gra].valueField;

          // GENERATE NEW GRAPH DATA
          dataset.dataProvider = generateChartData( dataset.dataProvider, valueField );

          // ADD FIELDMAPPING
          dataset.fieldMappings.push( {
            "fromField": valueField,
            "toField": valueField
          } );
        }
      }

      // ADD NEW DATASET
      chart.dataSets.push( dataset );
      chart.validateNow();
    } 
