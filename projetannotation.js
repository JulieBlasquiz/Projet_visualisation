/*
Script for annotation of proteomic data project
*/

//partie angular.js
/*
var app = angular.module('monapp',[])

app.controller('moncontroller',['$scope', function(scope){
	scope.madata1 = "AA BB CC DD"
	scope.madata2 = "AA CC FF HH"
}])
*/


//get html elements in variables
var launch = document.getElementById('launch');
var testeur = document.getElementById('testeur');
var testeur2 = document.getElementById('testeur2');
var help = document.getElementById('helpcsv1');
var help2 = d3.select("#helpcsv");


//launch functions from variables
var setupListeners = function() {
//	launch.addEventListener('click', analysis);
	launch.addEventListener('click', diagram);
	testeur.addEventListener('click', testeu);
    testeur2.addEventListener('click', testeu2);
	help.addEventListener('mouseover', helpcsv);
}

var testeu = function() {
    var sp1 = document.menuform.menuselect1.selectedIndex;
alert(sp1);
}

var testeu2 = function() {
    document.getElementById("importtest").innerHTML = "";
    var tablevenn = ftest();
    var sp = document.menuform.menuselect1.selectedIndex;
    for (var i=0;i<tablevenn[sp].length;i++){
    d3.select("#importtest").append("div").append("a").attr("href", "http://www.uniprot.org/uniprot/" + tablevenn[sp][i][0]).text(tablevenn[sp][i][0] + " ; ")
    .append("a").attr("href", "http://www.uniprot.org/uniprot/" + tablevenn[sp][i][1]).text(tablevenn[sp][i][1] + " ; ")
    .append("a").attr("href", "http://www.uniprot.org/uniprot/" + tablevenn[sp][i][2]).text(tablevenn[sp][i][2]);

}
}



var helpcsv = function() {
    help2.text("comment faire");
    help2.transition().duration(40).style("opacity", 1);
}

//push first element of array to the end
var pushleft = function(tab){
var tmp = tab[0];
tab.splice(0,1);
tab.push(tmp);
}

var delarray = function(tab){
tab.sort();
var i = 0;
while (i<tab.length){
if (String(tab[i]) === String(tab[i+1])){
tab.splice(i+1,1);
i--;
}
i++;
}
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


function readimport1(Cn,X,I,Import1,Import2){
    for (var i = 0; j<Import2.length;i++){
        if (Import1[I][0] === Import2[i][0]){
            return Cn+1;
}}}

var ftest = function(){
var tablevenn = [[],[],[],[],[],[],[]];
var cycle = [dataimport1,dataimport2,dataimport3];
var cn = 0;
for (var n=0;n<3;n++){
for (var i = 0; i<cycle[0].length;i++){
    for (var j = 0; j<cycle[1].length;j++){
        if ((cycle[0][i][0] === cycle[1][j][0]) && (cycle[0][i][1] !== "NA") && (cycle[0][i][2] !== "NA")){
            cn+=1;
            break;
        }
    }

    for (var k = 0; k<cycle[2].length;k++){
        if ((cycle[0][i][0] === cycle[2][k][0]) && (cycle[0][i][1] !== "NA") && (cycle[0][i][2] !== "NA")){
            cn+=2;
            break;
        }
    }
    if (cn === 0){
    tablevenn[n].push(cycle[0][i]);
    }
    if (cn == 1 && cycle[0] == dataimport1){
    tablevenn[3].push(cycle[0][i]);
    }
    if (cn == 1 && cycle[0] == dataimport2){
    tablevenn[4].push(cycle[0][i]);
    }
    if (cn == 1 && cycle[0] == dataimport3){
    tablevenn[5].push(cycle[0][i]);
    }
    if (cn == 2 && cycle[0] == dataimport1){
    tablevenn[3].push(cycle[0][i]);
    }
    if (cn == 2 && cycle[0] == dataimport2){
    tablevenn[4].push(cycle[0][i]);
    }
    if (cn == 2 && cycle[0] == dataimport3){
    tablevenn[5].push(cycle[0][i]);
    }
    if (cn === 3){
        tablevenn[6].push(cycle[0][i]);
    }
    cn=0;
}
pushleft(cycle);
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
    {sets:["sp1"], figure: tablevenn[0].length, label: "sp1", size: tablevenn[0].length},
    {sets:["sp2"], figure: tablevenn[1].length, label: "sp2", size: tablevenn[1].length},
    {sets:["sp3"], figure: tablevenn[2].length, label: "sp3", size: tablevenn[2].length},
    {sets: ["sp1", "sp2"], figure: tablevenn[3].length, label: "", size: tablevenn[3].length},
    {sets: ["sp1", "sp3"], figure: tablevenn[4].length, label: "", size: tablevenn[4].length},
    {sets: ["sp2", "sp3"], figure: tablevenn[5].length, label: "", size: tablevenn[5].length},
    {sets: ["sp1", "sp2", "sp3"], figure: tablevenn[6].length, label: "", size: tablevenn[6].length}
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


var tooltip = d3.select("#venn_diagram").append("div")
    .attr("class", "venntooltip");


div.selectAll("g")
    .on("mouseover", function(d, i) {
    // sort all the areas relative to the current item
    venn.sortAreas(div, d);

    // Display a tooltip with the current size
    tooltip.transition().duration(40).style("opacity", 1);
    tooltip.text("le nombre de gènes de " + d.label + "est de " + d.size);


    // problème graphique disparait
    //highlight the current path
   /* var selection = d3.select(this).transition("tooltip").duration(400);
    selection.select("path")
        .style("stroke-width", 3)
        .style("fill-opacity", d.sets.length < 1 ? .8 : 0)
        .style("stroke-opacity", 1);
    })

    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })

    .on("mouseout", function(d, i) {
        tooltip.transition().duration(2000).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("stroke-width", 3)
            .style("fill-opacity", d.sets.length < 1 ? .8 : 0)
            .style("stroke-opacity", 1);
    */})

		//affiche données en cliquant, sera remplacé par menu déroulant
    .on("click", function(d, i){
      venn.sortAreas(div, d);
      var texte = document.getElementById('venn_value');
      texte.textContent = ("proportion: " + d.size);
    });

var venntitle = document.getElementById('venn_title');
	venntitle.textContent = "Diagramme de venn";
}







/*to do:
reduire la taille de la fonction import avec des boucles
faire des menus déroulants pour choisir les listes de gènes à afficher
appeler un fonction python
barchart with negative values
*/




window.addEventListener('load', setupListeners);




