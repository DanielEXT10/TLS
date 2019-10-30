const socket = io;

socket.on('torque', function(data){
    console.log(data);
});