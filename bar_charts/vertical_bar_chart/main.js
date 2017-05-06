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

// Asynchronous download/loading of data file
d3.tsv("data.tsv", type, function(error, data) {
  // relativ width of the bars, dependent on number of bars (array of data domain)
  x.domain(data.map(function(d){ return d.name; }));
  y.domain([0, d3.max(data, function(d){ return d.value; })]);

  // Adding bar charts
  var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d,i){ return "translate("+ x(d.name) +",0)";});


  // bar.append("rect")
  //     .attr("y", function(d) { return y(d.value); })
  //     .attr("height", function(d) { return height - y(d.value); })
  //     .attr("width", x.bandwidth());


        bar.append("rect")
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .attr("width", x.bandwidth());
});

  // code processed after data loading
function type(d){
    d.value = +d.value;
    return d;
}

}
