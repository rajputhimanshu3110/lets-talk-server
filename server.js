const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./router');
const connection = require('./connection');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const User = require('./models/User');
const Socket = require('./models/Socket');


dotenv.config();
connection();
const app = express();

app.use(cors());
app.use(express.json());

const server = createServer(app);
app.use(router);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log("User connected with id: " + socket.id);
    socket.on('addSocket', async ({ mobile }) => {
        console.log(`Received addSocket event with mobile: ${mobile}`);
        const user = await Socket.findOne({ mobile: mobile });
        if (!user) {
            await Socket.create({ mobile, sockets: [socket.id] });
        } else {
            await Socket.updateOne({ mobile: mobile }, { sockets: [socket.id] });
            // await Socket.updateOne({ mobile: mobile }, { $push: { sockets: socket.id } });
        }
    });

    socket.on('message', async (data, cb) => {
        //get socket from db and send to all sockets is at lease one received done else mark as undelivered and save in db
        try {
            console.log(data);
            const userSocket = await Socket.findOne({ mobile: data.receiver });
            console.log("receiver is " + userSocket.sockets[0]);
            console.log("Sender is" + socket.id);
            userSocket.sockets.forEach((s) => {
                console.log(data.message);
                io.to(s).emit('message', data.message);
            })
            cb({ status: true });
        } catch (error) {
            console.log(error);
            cb({ status: false });
        }


    })

})



server.listen(process.env.PORT || 3001, () => {
    console.log(`Server is runnig at ${process.env.PORT || 3001}`)
})