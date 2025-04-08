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

const usersSocketMap: Record<string, string> = {};

export function getSocketId(userId: string) {
    return usersSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log('user connected', socket.id);
    
    socket.on("auth", (userId) => {
        usersSocketMap[userId] = socket.id;
        console.log("List connected", usersSocketMap);
    })

    socket.on("logout", ({userId}) => {
        console.log("List before disconnection", usersSocketMap);
        if(userId){
            delete usersSocketMap[userId];
        }
        console.log("List after disconnection", usersSocketMap);

    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

export { io, app, server };