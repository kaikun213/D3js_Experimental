// code processed before showing window (initialize)
window.onload = function (){

// margins in d3 are specified as own objects. The width and height of the graphical presenation is adjusted with the margins.
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// scaling the y variable relativ to the max data (vertical bar chart)
var y = d3.scaleLinear()
        .range([height, 0]);

var x = d3.scaleBand()
        .rangeRound([0, width], 0.1)

var chart =  d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      // we append an object "g" for the margins
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.axisBottom()
      .scale(x);

var yAxis = d3.axisLeft()
      .scale(y);

// Asynchronous download/loading of data file
d3.tsv("data.tsv", type, function(error, data) {
  // relativ width of the bars, dependent on number of bars (array of data domain)
  x.domain(data.map(function(d){ return d.name; }));
  y.domain([0, d3.max(data, function(d){ return d.value; })]);

  // Adding axis to chart
  chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,"+ height + ")")
        .call(xAxis);
  chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

  // Adding bar charts
  var bar = chart.selectAll(".bar")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d,i){ return "translate("+ x(d.name) +",0)";});

  bar.append("rect")
      .attr("class", "successbar")
      .attr("height", function(d){ return height - y(d.value);})
      .attr("width", x.bandwidth() -1)
      .attr("y", function(d){ return y(d.value); });
      
  bar.append("rect")
      .attr("class", "failedbar")
      // height = rest of height when subtracting y (starting point left upper corner for bar)
      // UPDATE: divide height by two and override half of first bar => height would be dependent on success/failed number exercises later
      .attr("height", function(d){ return (height - y(d.value))/2;})
      .attr("width", x.bandwidth() -1)
      // y = starting point of bar , y(d.value) returns y relativ to the d value which regulates the height of the bars
      .attr("y", function(d){ return y(d.value)});

});

  // code processed after data loading
function type(d){
    d.value = +d.value;
    return d;
}

}
