import 'dotenv/config';
import {app} from './app.js'
import connectDB from "./src/db/index.js";
import http from 'http';



// io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     socket.on('joinRoom', async (roomId, userId) => {
//       socket.join(roomId);
//       console.log(`User ${userId} joined room: ${roomId}`);
  
//       // Load messages for the room
//       const room = await Room.findById(roomId);
//       if (room) {
//         io.to(socket.id).emit('loadMessages', room.messages);
//       }
//     });
    

//     socket.on('chatMessage', async (roomId, userId, text) => {
//       // Save the message to the database
//       const room = await Room.findById(roomId);
//       if (room) {
//         room.messages.push({ user: userId, text });
//         await room.save();
//       }
  
//       // Broadcast the message to all room members
//       io.to(roomId).emit('message', { user: userId, text });
//     });
  
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });



const port = 8000;
connectDB()
.then(()=>{
    app.listen(port || 8000 , ()=>{
        console.log(`Server started at port ${port}`)
    }) 
})
.catch((err)=>{
    console.log("Mongodb connection failed :: " , err)
})