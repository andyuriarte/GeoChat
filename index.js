var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var people = {};
var numUsers = 0;
var coords = {};

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
      res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client){
    var addededUser = false;

    client.on("add user", function(username){
        client.username = username;

        people[username] = username;
        ++numUsers;
        addedUser = true;

        client.emit("login", {
            numUsers: numUsers
        });
        io.emit("update-people", people);
     });
    
     client.on('location', function(position){
            io.emit('location', position);
     });
    
     client.on('chat message', function(msg){
         console.log(msg);
         io.emit('chat message', client.username, msg);
    });

});

http.listen(3000, function(){
      console.log('listening on *:3000');
});
