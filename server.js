const express = require('express')
const path = require('path')
const http = require("http");
const port = 4200;
const socketIO = require('socket.io')
const app = express();
const server = http.createServer(app)
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()
const io = socketIO(server)
const url = require('url');
const connection = [];
let gameId = null;
let imageRightNow = null;
let scoreCount = null;
// Set static folder
app.use(express.static(path.join(__dirname, "public")))

//start server
server.listen(port, () => console.log(`server is running on port ${port}`));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// Process application/json
app.use(bodyParser.json());

app.post('/multiplayer', function(request, response){
    if(connection.length < 1) {
        connection.push([0, request.body, null, request.body.user.turns]);
        return response.json({url: false, index: 0});
    } else {
        let found = false;
        let index = 0;
        connection.forEach((i) => {
            index++;
            if (i[2] === null && i[1].user.turns === request.body.user.turns){
                i[2] = request.body;
                found = true;
                return response.json( {url: '/multiplayer.html?player1=' + i[1].user.name + '&player2=' +
                        request.body.user.name + '&turns=' + request.body.user.turns + '&user=' + i[2].user.name
                        + '&id=' + i[0]});
                }
            }
        )
        if (!found) {
            connection.push([index, request.body, null, request.body.user.turns]);
            return response.json({url: false, index: index});
        }
    }
});

app.post('/waitingForResponse', function (req, res) {
    let found = false;
    connection.forEach((i) => {
        if(req.body.user.index === i[0] && i[2] != null) {
            found = true;
            return res.json( {
                status: 'success',
                url: '/multiplayer.html?player1=' + i[1].user.name + '&player2=' + i[2].user.name
                    + '&turns=' + i[3] + '&user=' + i[1].user.name + '&id=' + req.body.user.index
            });
        }
    });

    if (found === false) {
        return res.json ({
            status: 'error',
            url: false
        });
    }
    return false;
})

app.get('/redirectMulti', function (req, res){
    return res.redirect( 'http://localhost:4200/choose.html');
})

app.use('/changeName', function(req, res)  {
    const current_url = new URL(req.body.url.url);
    const search_params = current_url.searchParams;
    const player1 = search_params.get('player1');
    const player2 = search_params.get('player2');
    const turns = search_params.get('turns');
    const gameId = search_params.get('id');
    const user = search_params.get('user');
    return res.json({players : [player1, player2, turns],
        gameId: gameId,
        user: user
    });
})

app.post('/settings', function (req, res) {
    let userStart = null;
    connection.forEach((i) => {
        if(parseInt(i[0].toString()) === parseInt(req.body.settings.gameId.toString())) {
            userStart = i[1].user.name;
        }
    });
    return res.json({userStart: userStart});
})

app.post('/enemyRoll', function (req, res) {
    if(gameId === req.body.id.gameId) {
        gameId = null;
        res.send({
            image: imageRightNow,
            scoreCount: scoreCount
        })
    } else {
        res.send(false);
    }
})

app.post('/rollPlace', function (req, res) {
    gameId = req.body.images.gameId;
    imageRightNow = req.body.images.image;
    scoreCount = req.body.images.scoreCount;
})

/*
app.get('/changeName', function(req, res){
    console.log("Body Sent")
});
*/



// Handle a socket connection request from web client
//TODO
/*
const connections = [null, null]
io.on('connection', socket => {
    //console.log("new ws connection")
    let playerIndex = -1;
    for (const i in connections) {
        if(connections[i] === null) {
            playerIndex = i;
            break;
        }
    }
    //ignore player 3

    // Tell the connecting client what player number they are
    socket.emit('player-number', playerIndex)
    console.log(`Player ${playerIndex} has connected`)

    if (playerIndex === -1) return null;

    connections[playerIndex] = false;

    //tell everyone what player just connected
    socket.broadcast.emit('player-connection', playerIndex)

    //handle disconnect
    socket.on('disconnect', () => {
        console.log(`Player ${playerIndex} disconnected`)
        connections[playerIndex] = null
        //Tell everyone what player number just disconnected
        socket.broadcast.emit('player-connection', playerIndex)
    })
})*/
//TODO
