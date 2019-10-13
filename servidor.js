var app = require('express')();
var server = require('http').Server(app);
//var io = require('socket.io')(server);

var socket2;
var ctr = 1;
//app.use(express.static('views'));

app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/vista/index.html');
  res.send(cant.toString());
//  cant++;
  //socket2.emit('news', { msg: req.query.BPM });
});
var cant = 0;
app.post('/peticion1', function(req, res){
  cant++;
  console.log(cant);
	console.log(req.body);
	//io.sockets.emit('transmit', { msg: req.query});
});
/*
io.on('connection', function (socket) {
  socket2 = socket;
  io.sockets.emit('transmit', { msg: 'Connected to Device' });
  socket.on('my other event', function (data) {
  });
});
*/
var puerto = process.env.PORT || 4000;
server.listen(puerto, function(){
  console.log("Servidor iniciado en el puerto: "+ puerto)
});
