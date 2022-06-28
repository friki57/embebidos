var express = require('express');
var app = express();
const path = require('path');

var http = require('http');
var socket = require('socket.io');

const rutas = express.Router();
rutas.get('/', function (req, res) {
  res.sendFile(__dirname + '/vista/index2.html');
  var respuesta = "Temperatura: " + 0 + "°C Humedad: " + 0;
});
var cant = 0;

rutas.post('/', (req, res)=>{
  var respuesta = "Temperatura: " + req.query.temp.toString() + "°C Humedad: " + req.query.hume.toString();
  var unidad = 10.24;
  var aire = Math.round((req.query.gas / unidad)*100)/100;
  var resp = {
    tem: req.query.temp.toString(),
    hum: req.query.hume.toString(),
    gas: aire.toString()
  }
  io.emit("Cambios",resp)
  console.log("Llegó:",req.query);
  res.send("si")
	//io.sockets.emit('transmit', { msg: req.query});
});
app.use(express.static(path.join(__dirname,"/vista")));
/*
io.on('connection', function (socket) {
  socket2 = socket;
  io.sockets.emit('transmit', { msg: 'Connected to Device' });
  socket.on('my other event', function (data) {
  });
});
*/
app.use(rutas);
var puerto = 3000;
var server = http.createServer(app).listen(puerto, function(){
  console.log("Servidor iniciado en el puerto: "+ puerto)
});

var io = socket.listen(server);
io.sockets.on('connection', function () {
  console.log('hello world im a hot socket');
});
