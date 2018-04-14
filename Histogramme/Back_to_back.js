var margin = {top: 50, right: 20, bottom: 10, left: 320},
    width = 800 - margin.left - margin.right,
    height = 2500;

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .3);

var x = d3.scale.linear()
    .rangeRound([0, width]);

var color = d3.scale.ordinal()
    .range(["#c7001e", "#cccccc", "#92c6db"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var svg = d3.select("#figure").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "d3-plot")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  color.domain(["Group 1", "Common", "Group 2"]);

  d3.csv("result.txt", function(error, data) {

  data.forEach(function(d) {
    d["Group 1"] = +d[1]*100/d.N;
    d["Common"] = +d[2]*100/d.N;
    d["Group 2"] = +d[3]*100/d.N;

    var x0 = -1*(d["Common"]/2+d["Group 1"]);
    var idx = 0;
    d.boxes = color.domain().map(function(name) { return {name: name, x0: x0, x1: x0 += +d[name], N: +d.N, n: +d[idx += 1]}; });
  });

  var min_val = d3.min(data, function(d) {
          return d.boxes["0"].x0;
          });

  var max_val = d3.max(data, function(d) {
          return d.boxes["2"].x1;
          });

  x.domain([min_val, max_val]).nice();
  y.domain(data.map(function(d) { return d.Annot; }));

  svg.append("g")
      .attr("class", "x axis");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var vakken = svg.selectAll(".Annot")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + y(d.Annot) + ")"; });

  var bars = vakken.selectAll("rect")
      .data(function(d) { return d.boxes; })
    .enter().append("g").attr("class", "subbar");

  bars.append("rect")
      .attr("height", y.rangeBand())
      .attr("x", function(d) { return x(d.x0); })
      .attr("width", function(d) { return x(d.x1) - x(d.x0); })
      .style("fill", function(d) { return color(d.name); })

  bars.append("text")
      .attr("x", function(d) { return x(d.x0); })
      .attr("y", y.rangeBand()/2)
      .attr("dy", "0.5em")
      .attr("dx", "0.5em")
      .style("font" ,"10px sans-serif")
      .style("text-anchor", "begin")
      .text(function(d) { return d.n });

  vakken.insert("rect",":first-child")
      .attr("height", y.rangeBand())
      .attr("x", "1")
      .attr("width", width)
      .attr("fill-opacity", "0.5")
      .style("fill", "#F5F5F5")
      .attr("class", function(d,index) { return index%2==0 ? "even" : "uneven"; });

  svg.append("g")
      .attr("class", "y axis")
  .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y2", height);

  var startp = svg.append("g").attr("class", "legendbox").attr("id", "mylegendbox");
  var legend_tabs = [0, 120, 240];
  var legend = startp.selectAll(".legend")
      .data(color.domain().slice())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + legend_tabs[i] + ",-45)"; });

  legend.append("rect")
      .attr("x", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", 22)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "begin")
      .style("font" ,"10px sans-serif")
      .text(function(d) { return d; });

  d3.selectAll(".axis path")
      .style("fill", "none")
      .style("stroke", "#000")
      .style("shape-rendering", "crispEdges");

  d3.selectAll(".axis line")
      .style("fill", "none")
      .style("stroke", "#000")
      .style("shape-rendering", "crispEdges");

  var movesize = width/2 - startp.node().getBBox().width/2;
  d3.selectAll(".legendbox").attr("transform", "translate(" + movesize  + ",0)");

  var interaction = d3.selectAll(".bar")
    .on("mouseover", function(d) { d3.select(this).attr("fill-opacity", "0.5");})
    .on("mouseout", function(d) { d3.select(this).attr("fill-opacity", "1");});

  var interaction = d3.selectAll(".bar")
    .on("click", function(d,i) { d3.select("#infos").text(d.Annot +'\n\n' +"Group 1, " + d[1] + " ID : "+'\n\n' + d.geneID1 +'\n\n'+"Common group, " + d[2] + " ID : "+'\n\n'+ d.geneIDCommon + '\n\n'+"Group 2, "  + d[3] + " ID : "+'\n\n'+ d.geneID2);});

  var legend = startp.selectAll(".legend")
    .on("mouseover", function(d) { interaction.attr("fill-opacity", "0.5"),d3.select(this).attr("fill-opacity", "0.5");})
    .on("mouseout", function(d) { interaction.attr("fill-opacity", "1"),d3.select(this).attr("fill-opacity", "1");});
});
