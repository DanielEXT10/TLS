const http= require('http');
const express = require('express');
const path =require('path');
const morgan =require ('morgan');
const app = express();
const mongoose = require('mongoose');
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;
const socketIO = require('socket.io');

const server = http.createServer(app);
//implementacion de socketIO

const io = socketIO.listen(server);

io.on('connection', function(socket){
    console.log('A new socket is connected')
})

//comunicacion serial
const port= new SerialPort('COM4',{
    baudRate: 9600
});

const parser= port.pipe(new ReadLine({delimiter: '\r\n'}));

parser.on('open', function(){
    console.log('connection is opened');
});

parser.on('data', function(data)  {
    io.emit('torque', data); //transmitimos la misma info que recibimos del puerto serie
});

port.on('error',function(){
    console.log(err);
});

//connecting database
mongoose.connect('mongodb://localhost/torque_machine')
.then(db => console.log('db connected'))
.catch(err => console.log (err));

//importing routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 4000);//search available port
    //set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//form to JSON object
app.use(express.json({ limit: '1mb'}));


app.use('/public',express.static(__dirname + '/public'));



//routes
app.use('/', indexRoutes);
//starting the server
server.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});
