/*
Script pour le projet d'annotation des données protéomiques
*/

//partie angular.js
/*
var app = angular.module('monapp',[])

app.controller('moncontroller',['$scope', function(scope){
	scope.madata1 = "AA BB CC DD"
	scope.madata2 = "AA CC FF HH"
}])
*/


//récupère les bouttons dans des variables
var launch = document.getElementById('launch');
var testeur = document.getElementById('testeur');

//active des fonctions lors d'évènements
var setupListeners = function() {
//	launch.addEventListener('click', analysis);
	launch.addEventListener('click', diagram);
	testeur.addEventListener('click', testeu);
}

var testeu = function() {
alert(datanumber);
}


//compare deux listes de caractères, met en commun éléments identiques
/*
var analysis = function () {
	var sp1 = document.getElementById('espèce1').value;
	var sp2 = document.getElementById('espèce2').value;
	sp1 = sp1.split(' ');
	sp2 = sp2.split(' ');
	var tab = [];
	for (var elem1 in sp1){
		for (var elem2 in sp2){
			if (sp1[elem1]<=sp2[elem2]) {
				tab.push(sp1[elem1]);
				sp1.splice(elem1,1);
				sp2.splice(elem2,1);
			}
		}
	}
	var texte1 = document.getElementById('both');
	texte1.textContent = tab;
	var texte2 = document.getElementById('one');
	texte2.textContent = sp1;
	var texte3 = document.getElementById('two');
	texte3.textContent = sp2;
}
*/


//importation d'un fichier type csv
var dataimport = 0;
var datanumber = [0,0,0,0,0,0,0];
var datagenes = [[],[],[],[],[],[],[]];
var openFile = function(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;
		dataimport = text.split(["\n"]);
		for(var i=0;i<dataimport.length;i++){
			var tmp = dataimport[i].split([';']);
			dataimport[i] = tmp;
		}
        for(var i=1;i<dataimport.length;i++){
            
            if(typeof(dataimport[i][0]) === "string" && typeof(dataimport[i][1]) === "undefined" && typeof(dataimport[i][2]) === "undefined"){
                datanumber[6]=datanumber[6]+1;
                datagenes[6].push(dataimport[i]);
            }
            if(typeof(dataimport[i][0]) === "undefined" && typeof(dataimport[i][1]) === "string" && typeof(dataimport[i][2]) === "undefined"){
                datanumber[5]=datanumber[5]+1;
                datagenes[5].push(dataimport[i]);
            }
            if(typeof(dataimport[i][0]) === "undefined" && typeof(dataimport[i][1]) === "undefined" && typeof(dataimport[i][2]) === "string"){
                datanumber[4]=datanumber[4]+1;
                datagenes[4].push(dataimport[i]);
            }
            if(typeof(dataimport[i][0]) === "string" && typeof(dataimport[i][1]) === "string" && typeof(dataimport[i][2]) === "undefined"){
                datanumber[3]=datanumber[3]+1;
                datagenes[3].push(dataimport[i]);
            }
            if(typeof(dataimport[i][0]) === "string" && typeof(dataimport[i][1]) === "undefined" && typeof(dataimport[i][2]) === "string"){
                datanumber[2]=datanumber[2]+1;
                datagenes[2].push(dataimport[i]);
            }
            if(typeof(dataimport[i][0]) === "undefined" && typeof(dataimport[i][1]) === "string" && typeof(dataimport[i][2]) === "string"){
                datanumber[1]=datanumber[1]+1;
                datagenes[1].push(dataimport[i]);
            }
            if(typeof(dataimport[i][0]) === "string" && typeof(dataimport[i][1]) === "string" && typeof(dataimport[i][2]) === "string"){
                datanumber[0]=datanumber[0]+1;
                datagenes[0].push(dataimport[i]);
            }
            
        }
	};
	reader.readAsText(input.files[0]);
};


//calcule et affiche le diagramme de venn à partir des données importées
var diagram = function(){

//données du diagramme de venn
var sets = [
    {sets:["sp1"], figure: datanumber[6], label: dataimport[0][0], size: datanumber[6]},
    {sets:["sp2"], figure: datanumber[5], label: dataimport[0][1], size: datanumber[5]},
    {sets:["sp3"], figure: datanumber[4], label: dataimport[0][2], size: datanumber[4]},
    {sets: ["sp1", "sp2"], figure: datanumber[3], label: dataimport[0][0]+',\n'+dataimport[0][1], size: datanumber[3]},
    {sets: ["sp1", "sp3"], figure: datanumber[2], label: dataimport[0][0]+',\n'+dataimport[0][2], size: datanumber[2]},
    {sets: ["sp2", "sp3"], figure: datanumber[1], label: dataimport[0][1]+',\n'+dataimport[0][2], size: datanumber[1]},
    {sets: ["sp1", "sp2", "sp3"], figure: datanumber[0], label: dataimport[0][2]+',\n'+dataimport[0][1]+',\n'+dataimport[0][2], size: datanumber[0]}
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


    //highlight the current path
    var selection = d3.select(this).transition("tooltip").duration(400);
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
    })

    //affiche des données avec un clic
    .on("click", function(d, i){
      venn.sortAreas(div, d);
      var texte = document.getElementById('venn_value');
      texte.textContent = ("proportion: " + d.size);
    });

var venntitle = document.getElementById('venn_title');
	venntitle.textContent = "Diagramme de venn";
}
















//alert('truc');


window.addEventListener('load', setupListeners);




