import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios'

var prazanNiz = [{country: "Tesla", visits: 300},
                  {country: "Microsoft", visits: 500},{country: "Amazon", visits: 1000},
                  {country: "Netflix", visits: 1200},{country: "Apple", visits: 1540},
                  {country: "IBM", visits: 2000}];
const am4core = window.am4core;
const am4charts = window.am4charts;
const am4themes_dark = window.am4themes_dark;
const am4themes_animated = window.am4themes_animated;
am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  
  chart.data = prazanNiz;
  
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "country";
  categoryAxis.renderer.minGridDistance = 40;
  categoryAxis.fontSize = 11;
  
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.max = 24000;
  valueAxis.strictMinMax = true;
  valueAxis.renderer.minGridDistance = 30;
  // axis break
  var axisBreak = valueAxis.axisBreaks.create();
  axisBreak.startValue = 2100;
  axisBreak.endValue = 22900;
  //axisBreak.breakSize = 0.005;
  
  // fixed axis break
  var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
  axisBreak.breakSize = 0.05 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
  
  // make break expand on hover
  var hoverState = axisBreak.states.create("hover");
  hoverState.properties.breakSize = 1;
  hoverState.properties.opacity = 0.1;
  hoverState.transitionDuration = 500;
  
  axisBreak.defaultState.transitionDuration = 500;

  
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.categoryX = "country";
  series.dataFields.valueY = "visits";
  series.columns.template.tooltipText = "{valueY.value}";
  series.columns.template.tooltipY = 0;
  series.columns.template.strokeOpacity = 0;
  
  // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
  series.columns.template.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
  });
  
  }); 

function Item (props) {
  console.log(props)
  return (
    <div style={{margin:"20px", backgroundColor: "blue"}}>
    <h2>{props.data.title}</h2>
    </div>
  )
}

function App() {
  const [data, setData] = useState ([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?region=US&comparisons=%255EGDAXI%252C%255EFCHI&symbol=HYDR.ME&interval=5m&range=1d',
        {headers: {"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "49f9fd6365msh2c22d465b4b1ad5p1cdb2cjsncc1be62083c1"}}
      );
        console.log(result)
      setData(result.data);
    };
 
    fetchData();
  }, []);
  return (
    <div>
      {data.news && data.news.length>0 &&
        data.news.map(item => (
          <Item key={item.uuid} data={item}/>
        ))}

<div id="chartdiv"></div>
    </div>
  );
}

export default App;
