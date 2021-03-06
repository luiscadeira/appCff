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
