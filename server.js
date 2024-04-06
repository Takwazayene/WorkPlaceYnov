const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

let interval;
let users = [];
let messages = [];

io.on("connection", (socket) => {
    console.log("New client connected");

    console.log(users);

    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on("user login", (user) => {
        if (!users.find(({id}) => id === user.id)) users.push({...user, socketId: socket.id});
        console.log(users);
        io.emit("new login", users);
    });

    socket.on("user logout", (user) => {
        users = users.filter(({id}) => user.id !== id);
        console.log(users);
        io.emit("new login", users);
    });

    socket.on("new loggedUser", () => {
        console.log("new loggedUser");
        io.emit("new login", users);
    });

    socket.on("start messages", (data) => {
        console.log("start messages");
        messages = data;
    });

    socket.on("add message", (message) => {
        messages = [...messages, message];
        console.log(`new message : ${message}`);
        io.emit("new message", messages);
    });

    socket.on("disconnect", (data) => {
        console.log("user disconnect");
        users = users.filter(user => socket.id !== user.socketId)
        if(users >= 0)  {
            usersConnected.splice(i, 1);
            io.emit('new user list', usersConnected);
          }
        clearInterval(interval);
    });
    socket.on("emit group", (group) => {
        io.emit("new group", group);
        clearInterval(interval);
    });
    socket.on("emit threads", (thread) => {
        io.emit("new Threads", thread);
        clearInterval(interval);
    });
});

const getApiAndEmit = (socket) => {
    const response = new Date();
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));