/*
Script for annotation of proteomic data project
*/



//get html elements in variables
var launchvenn = document.getElementById('launchvenn');
var launchback = document.getElementById('launchback');
var download = document.getElementById('download');
//var testeur = document.getElementById('testeur');
var help = document.getElementById('helpcsv1');
var hide1 = document.getElementById('hide1');
var hide2 = document.getElementById('hide2');
var menuselect3 = document.getElementById('menuselect3');
var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var input3 = document.getElementById('input3');

//launch functions from variables
var setupListeners = function() {
	launchvenn.addEventListener('click', launchvennf);
	launchback.addEventListener('click', backtoback);
//	testeur.addEventListener('click', testeu);
	help.addEventListener('mouseover', helpcsv1);
	help.addEventListener('mouseout', helpcsv2);
	download.addEventListener('click',downloadfile);
	hide1.addEventListener('click',hidef1);
	hide2.addEventListener('click',hidef2);
	menuselect3.addEventListener('change',changef);
	input1.addEventListener('change',openFile);
	input2.addEventListener('change',openFile2);
	input3.addEventListener('change',openFile3);
}

window.addEventListener('load', setupListeners);

//Hide or show a block in html
var hidef1 = function() {
    var x = document.getElementById("importtest");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
}}
var hidef2 = function() {
    var x = document.getElementById("divfigure");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
}}

//test button
var testeu = function() {
    alert(filenames());
}


//change background color when index is changed
var changef = function(){
	var classes = ["sp1","sp2","sp3","sp1-2","sp2-3","sp1-3","sp1-2-3"];
	var index = document.menuform3.menuselect3.selectedIndex;
	for (var i = 0 ; i<classes.length ; i++){
		var width = document.getElementsByClassName(classes[i]);
		for (var j=0 ; j<width.length ; j++){
		width[j].style.backgroundColor = "white";
	}}
	var width = document.getElementsByClassName(classes[index]);
	for (var i=0 ; i<width.length ; i++){
		width[i].style.backgroundColor = "#aaffaa";
	}
}

//Create or delete help for csv
var helpcsv1 = function() {
    var help2 = document.getElementById('helpcsv2');
    help2.style.display = "block";
}
var helpcsv2 = function() {
    var help2 = document.getElementById('helpcsv2');
    help2.style.display = "none";
}


//push first element of array to the end
var pushleft = function(tab){
var tmp = tab[0];
tab.splice(0,1);
tab.push(tmp);
}

//Delete dupplicate elements in array
var delarray = function(tab){
tab.sort();
var i = 0;
while (i<tab.length){
if (String(tab[i]) === String(tab[i+1])){
tab.splice(i+1,1);
i--;
}
i++;
}}

//return an array with specie names
var filenames = function(){
var tabsp = [];
for (var i=0;i<3;i++){
tabsp.push(document.getElementById('input'+String(i+1)).value);
var tmp = tabsp[i].split("/");
tmp = tmp[tmp.length-1].split(".");
tabsp[i]=tmp[0];
}
tabsp.push(tabsp[0]+"+"+tabsp[1]);
tabsp.push(tabsp[1]+"+"+tabsp[2]);
tabsp.push(tabsp[0]+"+"+tabsp[2]);
tabsp.push(tabsp[0]+"+"+tabsp[1]+"+"+tabsp[2]);
return tabsp;
}

//Put specie names in the lists
var specielist = function(){
var tabsp = filenames();
d3.selectAll(".menusp").remove();
var add1 = d3.select("#menuselect1");
var add2 = d3.select("#menuselect2");
var add3 = d3.select("#menuselect3");
for (var i=0; i<7; i++){
add1.append("option").attr("class", "menusp").text(tabsp[i]);
add2.append("option").attr("class", "menusp").text(tabsp[i]);
add3.append("option").attr("class", "menusp").text(tabsp[i]);
}}

//download gene group as txt
function downloadfile() {
    var sp1 = document.menuform1.menuselect1.selectedIndex;
    var sp2 = document.menuform2.menuselect2.selectedIndex;
    if (sp1 !== sp2){
    downloadfile2(tablevenn[sp1],"1");
    downloadfile2(tablevenn[sp2],"2");
    }
    else {
    alert("pick two different groups");
    }
}
function downloadfile2(tablevenn,nb){
    var text = "";
    for (var i=0;i<tablevenn.length;i++){
        text = text + String(tablevenn[i]) + ",\n";
    }
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', 'listiduniprot' + nb + '.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


//Parse the file data when uploading
var parsedata = function(text){
	var dataimport = text.split(["\n"]);
	for(var i=0;i<dataimport.length;i++){
			var tmp = dataimport[i].split([',']);
			dataimport[i] = tmp;
}
return dataimport;
}

//open the input files
var dataimport1 = 0;
var openFile = function(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;
		dataimport1 = parsedata(text, dataimport1);
		}
	reader.readAsText(input.files[0]);
};

var dataimport2 = 0;
var openFile2 = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        dataimport2 = parsedata(text);
        }
    reader.readAsText(input.files[0]);
};

var dataimport3 = 0;
var openFile3 = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        dataimport3 = parsedata(text);
        }
    reader.readAsText(input.files[0]);
};



//create array with groups and create table
var tablevenn = [];
var parseentry = function(){
var table = [[],[],[],[],[],[],[]];
var cycle = [dataimport1,dataimport2,dataimport3];
//var dic = {5:[3,1,2],6:[4,2,3],7:[5,1,3],10:[3,1,3],11:[4,1,2],12:[5,2,3]}
var nbc = [0,1,2];
var cn = 0;
var tabsp = filenames();
d3.selectAll('.tablegenes').remove();

//loop for each file
for (var n=0;n<3;n++){
//create the table
var line = d3.select("#importtest").append("table").attr("class", "tablegenes").attr("id","tablegenes"+String(n+1));
line.append("tr").attr("id","tablehead"+String(n+1)).append("th").attr("colspan","3").text(tabsp[n]);

//loop reading every element of a file
for (var i = 0; i<cycle[0].length-1;i++){
    var line2 = line.append("tr");
    for (var j=0; j<3; j++){
    
    //add the content of files in the charts with uniprot link
    if (cycle[0][i][j] !== 'NA'){
    line2.append("td").append("a").attr("href", "http://www.uniprot.org/uniprot/" + cycle[0][i][j]).text(cycle[0][i][j]);
    }
    else {
    line2.append("td").text(cycle[0][i][j]);
    }}
    
    //detect category and append table
    table[n].push(cycle[0][i][n]);
    line2.attr("class","sp"+String(nbc[0]+1));

    //check table +1
    for (var j=0; j<cycle[1].length;j++){
        if ((cycle[0][i][nbc[1]] === cycle[1][j][nbc[1]])){
            cn+=5;
            
            if (n == 0){
            table[3].push(cycle[0][i][0]);
            table[3].push(cycle[0][i][1]);
            line2.attr("class","sp1-2");
            }
            if (n == 1){
            table[4].push(cycle[0][i][1]);
            table[4].push(cycle[0][i][2]);
            line2.attr("class","sp2-3");
            }
            if (n == 2){
            table[5].push(cycle[0][i][0]);
            table[5].push(cycle[0][i][2]);
            line2.attr("class","sp1-3");
            }
            break;
        }}
    //check table +2
    for (var j=0; j<cycle[2].length;j++){
        if ((cycle[0][i][nbc[2]] === cycle[2][j][nbc[2]])){
            cn+=10;
            
            if (n == 0){
            table[5].push(cycle[0][i][0]);
            table[5].push(cycle[0][i][2]);
            line2.attr("class","sp1-3");
            }
            if (n == 1){
            table[3].push(cycle[0][i][0]);
            table[3].push(cycle[0][i][1]);
            line2.attr("class","sp1-2");
            }
            if (n == 2){
            table[4].push(cycle[0][i][1]);
            table[4].push(cycle[0][i][2]);
            line2.attr("class","sp2-3");
            }
            break;
        }}
        
    if (cn === 15){
    table[6].push(cycle[0][i][0]);
    table[6].push(cycle[0][i][1]);
    table[6].push(cycle[0][i][2]);
    line2.attr("class","sp1-2-3");
    }
    
    /*
    //as dict
    else {
    table[dic[cn+nbc][0]].push(cycle[0][i][dic[cn+nbc[0]][1]]);
    table[dic[cn+nbc][0]].push(cycle[0][i][dic[cn+nbc[0]][2]]);
    line2.attr("class","sp1-3");
    }*/
    
    cn=0;
}
pushleft(cycle);
pushleft(nbc);
}
for (var i=0;i<table.length;i++){
delarray(table[i]);
}
return table;
}


//when the launch button is pressed
var launchvennf = function(){
specielist();
var show = document.getElementById("venndata");
show.style.display = "block";
tablevenn = parseentry();
diagram(tablevenn);
}

//calcul and show the venn diagram from imported data
var diagram = function(tablevenn){
//venn diagram data
var spname = filenames();
var sets = [
    {sets:["sp1"], figure: tablevenn[0], label: spname[0], size: 50},
    {sets:["sp2"], figure: tablevenn[1], label: spname[1], size: 50},
    {sets:["sp3"], figure: tablevenn[2], label: spname[2], size: 50},
    {sets: ["sp1", "sp2"], figure: tablevenn[3], label: "", size: 20},
    {sets: ["sp2", "sp3"], figure: tablevenn[4], label: "", size: 20},
    {sets: ["sp1", "sp3"], figure: tablevenn[5], label: "", size: 20},
    {sets: ["sp1", "sp2", "sp3"], figure: tablevenn[6], label: "", size: 5}
    ];

var chart = venn.VennDiagram()
    .width(500)
    .height(400)

var div = d3.select("#venn_diagram").datum(sets).call(chart);
    div.selectAll("text").style("fill", "white");
    div.selectAll(".venn-circle path")
    	.style("fill-opacity", .8)
    	.style("stroke-width", 1)
    	.style("stroke-opacity", 1)
    	.style("stroke", "fff");

var tooltip = d3.select("#venn_value").append("div")
    .attr("class", "venntooltip");

div.selectAll("g")
    .on("mouseover", function(d, i) {
    // sort all the areas relative to the current item
    venn.sortAreas(div, d);

    // Display a tooltip with the current size
    tooltip.transition().duration(40).style("opacity", 1);
    tooltip.text("number of up-regulated genes: " + d.figure.length);

    //highlight the current path
    var selection = d3.select(this).transition("tooltip").duration(400);
    selection.select("path")
        .style("stroke-width", 3)
        .style("stroke-opacity", 1);
    })

    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })

    .on("mouseout", function(d, i) {
        tooltip.transition().duration(1000).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("stroke-width", 3)
            .style("stroke-opacity", 1);
    })

    //show genes ID on the side bar
    .on("click", function(d,i) {
    var fig = String(d.figure);
    fig = fig.split(",");
    for (var i=0; i<fig.length; i++){
    fig[i]="\n"+fig[i];
    }
    d3.select("#infos").text(fig);});
    ;

}



//Create the back to back diagram
var backtoback = function(){
d3.select("#backblock").style("display","block");

var margin = {top: 50, right: 0, bottom: 10, left: 320},
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
});}
