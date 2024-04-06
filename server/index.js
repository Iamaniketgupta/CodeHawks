import 'dotenv/config';  // dont change this line
import {app} from './app.js'
import connectDB from "./src/db/index.js";
import http from 'http';
// import socketIo from 'socket.io';
// const socketIo = require('socket.io');
import { Server } from 'socket.io';
import Message from './src/models/message.model.js'

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"],      // Allow only GET and POST requests
    allowedHeaders: ["my-custom-header"], // Allow only specific headers
    credentials: true              // Allow sending cookies along with the request
  }
});

// Store connected users' socket IDs
const connectedUsers = new Map();

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle login event
    socket.on('login', (userId) => {
        connectedUsers.set(userId, socket.id); // Associate user ID with Socket.IO connection
        console.log(`User ${userId} logged in`);
    });

    // Handle message event
    socket.on('message', async(data) => {
        console.log('Message received:', data);
        const { senderId, recipientId, message } = data;



        // Get recipient's socket ID
        const recipientSocketId = connectedUsers.get(recipientId);
        const userid =  connectedUsers.get(senderId);

        try {
            await Message.create({
                senderId,
                recipientId,
                message,
                read: false // Message is initially unread
            });
        } catch (error) {
            console.error('Error storing message:', error);
            // Optionally handle the error
        }

        // Emit message to recipient if online
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('message', { senderId, message });
            try {
                await Message.updateMany({ recipientId, read: false }, { read: true });
        io.to(userid).emit('message', { senderId, message });
            } catch (error) {
                console.error('Error marking messages as read:', error);
                // Optionally handle the error
            }
        } else {
            console.log(`Recipient with ID ${recipientId} is not connected.`);
            // Optionally handle the case where the recipient is not connected
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // Remove user's entry from the mapping
        connectedUsers.forEach((value, key) => {
            if (value === socket.id) {
                connectedUsers.delete(key);
            }
        });
    });
});

const port = 8000;
connectDB()
.then(()=>{
  server.listen(port || 8000 , ()=>{
        console.log(`Server started at port ${port}`)
    }) 
})
.catch((err)=>{
    console.log("Mongodb connection failed :: " , err)
})