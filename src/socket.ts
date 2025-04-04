import { Server } from "socket.io";
import http from "http";
import express from "express";


const { CLIENT_URL } = process.env;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [CLIENT_URL],
        methods: ["GET", "POST"]
    }
})

const users: Record<string, string[]> = {};

io.on("connection", (socket) => {
    console.log('user connected', socket.id);
    socket.on("auth", (userId) => {
        if (!users[userId]) {
            users[userId] = [socket.id];
        } else {
            users[userId].push(socket.id);
        }
        console.log(users);
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    })

    socket.on("sendFriendRequest", ({ friendId }) => {
        if (!users[friendId]) {
            console.log(`User with ID ${friendId} is not connected.`);
            return;
        }
        console.log(`New friend request ${friendId}`);
        users[friendId].forEach((socketId) => {
            console.log(socketId)
            io.to(socketId).emit("new_request", { "Message": "idk" });
        })
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

export { io, app, server };