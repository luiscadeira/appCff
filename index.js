var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5555));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendfile('public/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Rodando na porta', app.get('port'));
});

var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)

app.get('/',function(req,res){
  response.sendfile('public/index.html');
})

server.listen(8000,'0.0.0.0',function(){
 server.close(function(){
   server.listen(8001,'0.0.0.0')
 })
})
