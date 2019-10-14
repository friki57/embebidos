var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

const rutas = express.Router();
rutas.get('/', function (req, res) {
  res.sendFile(__dirname + '/vista/index.html');
  var respuesta = "Cantidad: " + cant.toString() + " Puerto: " + puerto.toString();
  
//  cant++;
});
var cant = 0;
rutas.post('/', (req, res)=>{
  cant++;
  var respuesta = "Cantidad: " + cant.toString() + " Puerto: " + puerto.toString();
  io.emit("Cambios",respuesta)
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
app.use(rutas);
var puerto = process.env.PORT || 3000;
app.listen(puerto, function(){
  console.log("Servidor iniciado en el puerto: "+ puerto)
});
