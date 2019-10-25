const express = require('express');
const path =require('path');
const morgan =require ('morgan');
const app = express();
const mongoose = require('mongoose');
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;
const io = require('socket.io');

//connecting database


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

//routes
app.use('/', indexRoutes);
//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});
