/*
Script for annotation of proteomic data project
*/


//get html elements in variables
var launch = document.getElementById('launch');
var download = document.getElementById('download');
var testeur = document.getElementById('testeur');
var help = document.getElementById('helpcsv1');
var hide1 = document.getElementById('hide1');
var menuselect1 = document.getElementById('menuselect1');


//launch functions from variables
var setupListeners = function() {
	launch.addEventListener('click', diagram);
	testeur.addEventListener('click', testeu);
	help.addEventListener('mouseover', helpcsv1);
	help.addEventListener('mouseout', helpcsv2);
	download.addEventListener('click',downloadfile);
	hide1.addEventListener('click',hidef);
	menuselect1.addEventListener('change',changef);
}

//Hide or show a block in html
var hidef = function () {
    var x = document.getElementById("importtest");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
}}

var testeu = function() {
    alert(filename.value);
}

//change background color when index is changed
var changef = function(){
	var classes = ["sp1","sp2","sp3","sp1-2","sp1-3","sp2-3","sp1-2-3"];
	var index = document.menuform1.menuselect1.selectedIndex;
	for (var i = 0 ; i<classes.length ; i++){
		var width = document.getElementsByClassName(classes[i]);
		for (var j=0 ; j<width.length ; j++){
		width[j].style.backgroundColor = "white";
	}}
	var width = document.getElementsByClassName(classes[index]);
	for (var i=0 ; i<width.length ; i++){
		width[i].style.backgroundColor = "teal";
	}
}

//Create or delete help for csv
var helpcsv1 = function() {
    d3.select("#helpcsv1").append("div").attr("id","helpcsv2").attr("class","tooltip");
    var help2 = d3.select("#helpcsv2");
    help2.text("Open the file with excel or libreoffice calc, select your dataframe, search \"\" and replace with \"NA\", then save as .csv with \";\" separator.");
    help2.transition().duration(40).style("opacity", 1);
}
var helpcsv2 = function() {
    var suppr = document.getElementById('helpcsv2');
    var parent = document.getElementById('helpcsv1');
    parent.removeChild(suppr);
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

//download gene group as txt
function downloadfile() {
    var tabvenn = ftest();
    var sp1 = document.menuform1.menuselect1.selectedIndex;
    var sp2 = document.menuform2.menuselect2.selectedIndex;
    if (sp1 !== sp2){
    downloadfile2(tabvenn[sp1],"1",sp1);
    downloadfile2(tabvenn[sp2],"2",sp2);
    }
    else {
    alert("pick two different groups");
    }
}
function downloadfile2(tabvenn,nb,sp){
    var text = "";
    for (var i=0;i<tabvenn.length;i++){
    if (sp == 6){
      for (var j=0; j<3; j++){
        text = text + String(tabvenn[i][j] + ",\n");
      }
    }
    else{
                text = text + String(tabvenn[i]) + ",\n";
    }}
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', 'listiduniprot' + nb + '.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

//import of a csv file
var dataimport1 = 0;
var openFile = function(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;
		dataimport1 = text.split(["\n"]);
		for(var i=0;i<dataimport1.length;i++){
			var tmp = dataimport1[i].split([',']);
			dataimport1[i] = tmp;
		}

	};
	reader.readAsText(input.files[0]);
};

var dataimport2 = 0;
var openFile2 = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        dataimport2 = text.split(["\n"]);
        for(var i=0;i<dataimport2.length;i++){
            var tmp = dataimport2[i].split([',']);
            dataimport2[i] = tmp;
        }

    };
    reader.readAsText(input.files[0]);
};

var dataimport3 = 0;
var openFile3 = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        dataimport3 = text.split(["\n"]);
        for(var i=0;i<dataimport3.length;i++){
            var tmp = dataimport3[i].split([',']);
            dataimport3[i] = tmp;
        }

    };
    reader.readAsText(input.files[0]);
};


//create array with groups and create table
var ftest = function(){
var tablevenn = [[],[],[],[],[],[],[]];
var cycle = [dataimport1,dataimport2,dataimport3];
var nbc = [0,1,2];
var cn = 0;
var suppr = document.getElementsByClassName('tablegenes');
var parent = document.getElementById('importtest');
for (var i=0;i<3;i++){
parent.removeChild(suppr[0]);}
for (var n=0;n<3;n++){
var line = d3.select("#importtest").append("table").attr("class","tablegenes");
line.append("tr").attr("id","tablehead"+String(n+1)).append("th").attr("colspan","3").text(document.getElementById('input'+String(n+1)).value);
for (var i = 0; i<cycle[0].length-1;i++){
    for (var j=0; j<cycle[1].length;j++){
        if ((cycle[0][i][nbc[0]] === cycle[1][j][nbc[0]]) && (cycle[0][i][nbc[1]] !== "NA") && (cycle[0][i][nbc[2]] !== "NA")){
            cn+=1;
            break;
        }}
    for (var j=0; j<cycle[2].length;j++){
        if ((cycle[0][i][nbc[0]] === cycle[2][j][nbc[0]]) && (cycle[0][i][nbc[1]] !== "NA") && (cycle[0][i][nbc[2]] !== "NA")){
            cn+=2;
            break;
        }}
    var line2 = line.append("tr");
    for (var j=0; j<3; j++){
    if (cycle[0][i][j] !== 'NA'){
    line2.append("td").append("a").attr("href", "http://www.uniprot.org/uniprot/" + cycle[0][i][j]).text(cycle[0][i][j]);
    }
    else {
    line2.append("td").text(cycle[0][i][j]);
    }}
    if (cn === 0){
    tablevenn[n].push(cycle[0][i][n]);
    line2.attr("class","sp"+String(nbc[0]+1));
    }
    if (cn == 1 && cycle[0] == dataimport1){
    tablevenn[3].push(cycle[0][i][0]);
    tablevenn[3].push(cycle[0][i][1]);
    line2.attr("class","sp1-2");
    }
    if (cn == 1 && cycle[0] == dataimport2){
    tablevenn[4].push(cycle[0][i][1]);
    tablevenn[4].push(cycle[0][i][2]);
    line2.attr("class","sp2-3");
    }
    if (cn == 1 && cycle[0] == dataimport3){
    tablevenn[5].push(cycle[0][i][0]);
    tablevenn[5].push(cycle[0][i][2]);
    line2.attr("class","sp1-3");
    }
    if (cn == 2 && cycle[0] == dataimport1){
    tablevenn[3].push(cycle[0][i][0]);
    tablevenn[3].push(cycle[0][i][2]);
    line2.attr("class","sp1-3");
    }
    if (cn == 2 && cycle[0] == dataimport2){
    tablevenn[4].push(cycle[0][i][0]);
    tablevenn[4].push(cycle[0][i][1]);
    line2.attr("class","sp1-2");
    }
    if (cn == 2 && cycle[0] == dataimport3){
    tablevenn[5].push(cycle[0][i][1]);
    tablevenn[5].push(cycle[0][i][2]);
    line2.attr("class","sp2-3");
    }
    if (cn === 3){
    tablevenn[6].push(cycle[0][i]);
    line2.attr("class","sp1-2-3");
    }
    cn=0;
}
pushleft(cycle);
pushleft(nbc);
}
for (var i=0;i<tablevenn.length;i++){
delarray(tablevenn[i]);
}
return tablevenn;
}




//calcul and show the venn diagram from imported data
var diagram = function(){
var tablevenn = ftest();
//venn diagram data
var sets = [
    {sets:["sp1"], figure: tablevenn[0].length, label: document.getElementById('input1').value, size: 50},
    {sets:["sp2"], figure: tablevenn[1].length, label: document.getElementById('input2').value, size: 50},
    {sets:["sp3"], figure: tablevenn[2].length, label: document.getElementById('input3').value, size: 50},
    {sets: ["sp1", "sp2"], figure: tablevenn[3].length, label: "", size: 20},
    {sets: ["sp1", "sp3"], figure: tablevenn[4].length, label: "", size: 20},
    {sets: ["sp2", "sp3"], figure: tablevenn[5].length, label: "", size: 20},
    {sets: ["sp1", "sp2", "sp3"], figure: tablevenn[6].length, label: "", size: 5}
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
    tooltip.text("number of up-regulated genes: " + d.figure);

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
    });

var venntitle = document.getElementById('venn_title');
	venntitle.textContent = "Diagramme de venn";
d3.select("#venn_1").style("border","double");
}





window.addEventListener('load', setupListeners);











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

  d3.csv("list1.tableReport.txt", function(error, data) {

  data.forEach(function(d) {
    //calc percentages
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
      //.call(xAxis);

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
      .text(function(d) { return d.n });//!== 0 && (d.x1-d.x0)>3 ? d.n : "" });

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
  // this is not nice, we should calculate the bounding box and use that
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
//#alert(d.Annot+"\n" + d[1] + " ID : " + "\n" + d.geneID);})
    .on("mouseover", function(d) { d3.select(this).attr("fill-opacity", "0.5");})
    .on("mouseout", function(d) { d3.select(this).attr("fill-opacity", "1");});

  var interaction = d3.selectAll(".bar")
    .on("click", function(d,i) { d3.select("#infos").text(d.Annot+"\n" + d[1] + " ID : " + "\n" + d.geneID);});

  var legend = startp.selectAll(".legend")
    .on("mouseover", function(d) { interaction.attr("fill-opacity", "0.5"),d3.select(this).attr("fill-opacity", "0.5");})
    .on("mouseout", function(d) { interaction.attr("fill-opacity", "1"),d3.select(this).attr("fill-opacity", "1");});
});
