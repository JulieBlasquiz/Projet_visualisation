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
var help = document.getElementById('helptxt');

//launch functions from variables
var setupListeners = function() {
//	launch.addEventListener('click', analysis);
	launch.addEventListener('click', diagram);
	testeur.addEventListener('click', testeu);
    help.addEventListener('mouseover', helptxt);
}

var testeu = function() {
alert(datanumber);
}

var helpcsv = function() {
    tooltip.transition().duration(40).style("opacity", 1);
    tooltip.text("comment faire");
}



//import of a csv file
var dataimport = 0;
var datanumber = [0,0,0];
var datagenes = [[]];
var openFile = function(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;
		dataimport = text.split(["\n"]);
		for(var i=0;i<dataimport.length;i++){
			var tmp = dataimport[i].split([',']);
			dataimport[i] = tmp;
		}
        for(var i=1;i<dataimport.length;i++){
            if(dataimport[i][0].length > 1 && dataimport[i][1].length === 1 && dataimport[i][2].length > 1){
                datanumber[2]=datanumber[2]+1;
                datagenes[2].push(dataimport[i]);
            }
            if(dataimport[i][0].length === 1 && dataimport[i][1].length > 1 && dataimport[i][2].length > 1){
                datanumber[1]=datanumber[1]+1;
                datagenes[1].push(dataimport[i]);
            }
            if(dataimport[i][0].length > 1 && dataimport[i][1].length > 1 && dataimport[i][2].length > 1){
                datanumber[0]=datanumber[0]+1;
                datagenes[0].push(dataimport[i]);
            }
            
        }
	};
	reader.readAsText(input.files[0]);
};


//calcul and show the venn diagram from imported data
var diagram = function(){

//venn diagram data
var sets = [
    {sets:["sp1"], figure: datanumber[2], label: dataimport[0][1], size: datanumber[3]},
    {sets:["sp2"], figure: datanumber[1], label: dataimport[1][2], size: datanumber[3]},
    {sets: ["sp1", "sp2"], figure: datanumber[0], label: "", size: datanumber[3]},
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
*/




window.addEventListener('load', setupListeners);




