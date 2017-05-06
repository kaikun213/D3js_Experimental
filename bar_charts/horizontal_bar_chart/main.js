// code processed before showing window (initialize)
window.onload = function (){

var width = 420,
    barHeight = 20;

var displayRange = d3.scaleLinear()
.range([0, width]);

var chart =  d3.select(".chart")
    .attr("width", width)

// Asynchronous download/loading of data file
d3.tsv("data.tsv", type, function(error, data) {
  // code to execute when loading is complete
                                        // function needed to pass data to max function
  displayRange.domain([0, d3.max(data, function(d){ return d.value; })]);

  chart.attr("height", barHeight * data.length);

  var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i){ return "translate(0," + i * barHeight + ")";});

  bar.append("rect")
      // pass data to scale function
      .attr("width", function(d){ return displayRange(d.value);})
      .attr("height", barHeight -1)

  bar.append("text")
      .attr("x", function(d){ return displayRange(d.value) -3;})
      .attr("y", barHeight/2)
      .attr("dy", ".35em")
      .text(function(d){ return d.value; });
  });

  // code processed after data loading
function type(d){
    d.value = +d.value;
    return d;
}

}
