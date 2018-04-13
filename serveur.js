var http = require('http');


var spawn = require('child_process').spawn,
    py    = spawn('python', ['compute_input.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';

py.stdout.on('data', function(data){
  dataString += data.toString();
});
//py.stdout.on('end', function(){
//  console.log('Sum of numbers=',dataString);
//});
py.stdin.write(JSON.stringify(data));
py.stdin.end();


var david = require('child_process').spawn,
dav = spawn('python', ['./python_Kegg_final/newClient/DAVIDWebService_Client.py']),
outdav = '';

/*
dav.stdout.on('data', function(){
  dataString += data.toString();
});

dav.stdin.write(JSON.stringify(data));
dav.stdin.end();
*/

var spawn1 = require('child_process').spawn,
    py1    = spawn('python', ['compute_input.py']),
    data1 = [1,2,3,4,5,6,7,8,9],
    dataString1 = '';

py1.stdout.on('data', function(data1){
  dataString1 += data1.toString();
});
//py.stdout.on('end', function(){
//  console.log('Sum of numbers=',dataString);
//});
py1.stdin.write(JSON.stringify(data1));
py1.stdin.end();


var server = http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(dataString);
  res.write(dataString1);
  res.end();
});

server.on('close', function() { // On écoute l'évènement close
    console.log('Bye bye !');
})


server.listen(8080); // Démarre le serveur



