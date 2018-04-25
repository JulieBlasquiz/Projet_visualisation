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
dav = david('python', ['./python_Kegg_final/newClient/DAVIDWebService_Client.py']),
davdata = ["P24638", "Q9ERK7", "Q9JI91", "P09242", "P31750", "P05064", "O54774", "P98084", "Q03157", "Q06335", "P12023", "P04627", "P50428", "Q8VDN2", "P56480", "P97450", "Q9CQV8"]
outdav = '';

dav.stdout.on('data', function(data){
  outdav += data.toString();
});

dav.stdout.on('end', function(){
  console.log(outdav);
});

dav.stdin.write(JSON.stringify(davdata));
dav.stdin.end();


var spawn1 = require('child_process').spawn,
    py1    = spawn1('python', ['test1.py']),
    data1 = [1,2,3,4,5,6,7,8,9],
    dataString1 = '';

py1.stdout.on('data', function(data1){
  dataString1 += data1.toString();
});
py1.stdout.on('end', function(){
  console.log('Sum of numbers=',dataString1);
});
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



