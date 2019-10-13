var express = require('express');
var app = express();
const rutas = express.Router();
rutas.get('/', function (req, res) {
  //res.sendFile(__dirname + '/vista/index.html');
  res.send(cant.toString());
//  cant++;
});
var cant = 0;
rutas.post('/pet', (req, res)=>{
  cant++;
  console.log(cant);
	console.log(req.body);
  res.redirect("/")
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
var puerto = process.env.PORT || 4000;
app.listen(puerto, function(){
  console.log("Servidor iniciado en el puerto: "+ puerto)
});
