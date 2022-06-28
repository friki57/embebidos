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

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/estacion')
.then(db => console.log('db connected'))
.catch(err => console.log(err));
const Schema = mongoose.Schema;

const datosSchema = Schema({
    temp: Number,
    hume: Number,
    gas: Number,
    lluvia: Number,
    suelo: Number,
    fecha: String
});
var Datos = mongoose.model('datos', datosSchema);

var cant = 0;
rutas.get('/s/:temp/:hume/:gas/:lluvia/:suelo', function (req, res) {
  var respuesta = "Temperatura: " + req.params.temp.toString() + "°C Humedad: " + req.params.hume.toString();
  var unidad = 10.24;
  var aire = Math.round((req.params.gas / unidad)*100)/100;
  var currentdate = new Date(); 
  req.params.fecha = currentdate
var datetime = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  var resp = {
    temp: req.params.temp.toString(),
    hume: req.params.hume.toString(),
    gas: req.params.lluvia.toString(),
    lluvia: req.params.lluvia.toString(),
    suelo: req.params.suelo.toString(),
    fecha: datetime
  }
  io.emit("Cambios",resp)
  console.log("Llegó:",req.params);
  var datos = new Datos(req.params);
  datos.save((error, resp) => {
    if (!error) {
        res.send("si")
    }
    else {
      console.log("Error ingresando en la tabla: ", error);
        res.send("no")
    }
  });

});
rutas.get('/leer', function (req, res) {
    Datos.find((error, resp) => {
      if (!error) {
        console.log(resp);
        res.send(resp)
      }
      else {
        console.log("error buscando a uno en la tabla: ", error);
        res.send("No")
      }
    });
});
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
