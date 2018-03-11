function chargerListeIDgenes(event){
    var fileInput = document.querySelector('#file');
    fileInput.addEventListener('change', function() {
	var reader = new FileReader();
	reader.readAsText(fileInput.files[0]);
	reader.addEventListener('load', function() {
	    //console.log(reader.result);
	    //alert('Contenu du fichier "' + fileInput.files[0].name + '" :\n\n' + reader.result);
	    pipeline(reader.result);
	});
    });
    //return reader;
}


function convertToList(reader){
    var genesList = reader.split("\r\n");
    return genesList;
}

function appelAPI_DAVID(genesList){ //ne fonctionne pas
    var url = "https://david.ncifcrf.gov/conversion.jsp?type=NA&ids="+genesList+"&convertTo=OFFICIAL_GENE_SYMBOL";
    window.location = url;
    var ID = document.getElementById("SESSIONID");
    var url2 = "https://david.ncifcrf.gov/conversion2.jsp?status=convertAll&convertTo=OFFICIAL_GENE_SYMBOL";
    window.location = url2;
    return ID;
}

function appelAPI_DAVID_boucle(genesList){


}
function downloadOutputFile(ID){ //comment récupérer le fichier?
    var outputFileReader = new FileReader();
    var regularExpression = new RegExp("............."); 
    //var outputFile = outputFileReader.readAsText("https://david.ncifcrf.gov/data/download/conv_"+ID+regularExpression+".txt");
    /*
    $.get("http://www.mypage.com", function( my_var ) {
    // my_var contains whatever that request returned
    });
    */
    $.get("https://david.ncifcrf.gov/data/download/conv_"+ID+regularExpression+".txt", function( outputFile ) {
    // my_var contains whatever that request returned
    });
    return outputFile;
//1520596617930
}

function pipeline(reader){
    var genesList = convertToList(reader);
    console.log(genesList);
    var ID_session = appelAPI_DAVID(genesList);
    console.log(ID_session);
    var outputFile = downloadOutputFile(ID_session);
    console.log(outputFile);

}


function setupListeners(){
    window.addEventListener("click", chargerListeIDgenes);
}

window.addEventListener("load", setupListeners)
