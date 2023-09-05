// const express = require('express');
import express from "express";
const app = express();
import dotenv from 'dotenv';

import databaseConnect from './config/database.js'
import authRouter from './routes/authRoute.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import messengerRoute from './routes/messengerRoute.js';
import cors from 'cors';

const {Server} = require("socket.io");

dotenv.config({
     path : 'config/config.env'
})


const http = require('http');
const server = http.createServer(app);

app.use(cors({
     origin: '*', // Replace with your frontend domain
   }));



app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/messenger',authRouter);
app.use('/api/messenger',messengerRoute);



const PORT = process.env.PORT || 5002
app.get('/', (req, res)=>{
     res.send('This is from backend Sever')
})

databaseConnect();

const io = new Server(server);
 
let users = [];
const addUser = (userId,socketId,userInfo) => {
     const checkUser = users.some(u=> u.userId === userId );

     if(!checkUser){
          users.push({userId,socketId,userInfo});
     }
}
const userRemove = (socketId) => {
     users = users.filter(u=>u.socketId !== socketId );
}

const findFriend = (id) => {
     return users.find(u=>u.userId === id);
}

const userLogout = (userId) => {
     users = users.filter(u=>u.userId !== userId)
}


io.on('connection',(socket)=>{
     console.log('Socket is connecting...')
     socket.on('addUser',(userId,userInfo)=>{
          addUser(userId,socket.id,userInfo);
          io.emit('getUser',users);

     const us = users.filter(u=>u.userId !== userId);
     const con = 'new_user_add';
     for(var i = 0; i <us.length; i++ ){
          socket.to(us[i].socketId).emit('new_user_add',con);
     }




     });
     socket.on('sendMessage',(data)=>{
          const user = findFriend(data.reseverId);
          
          if(user !== undefined){
               socket.to(user.socketId).emit('getMessage', data)
          }          
     })

     socket.on('messageSeen',msg =>{
          const user = findFriend(msg.senderId);          
          if(user !== undefined){
               socket.to(user.socketId).emit('msgSeenResponse', msg)
          }          
     })

     socket.on('delivaredMessage',msg =>{
          const user = findFriend(msg.senderId);          
          if(user !== undefined){
               socket.to(user.socketId).emit('msgDelivaredResponse', msg)
          }          
     })
     socket.on('seen',data =>{
          const user = findFriend(data.senderId);          
          if(user !== undefined){
               socket.to(user.socketId).emit('seenSuccess', data)
          } 
     })


     socket.on('typingMessage',(data)=>{
          const user = findFriend(data.reseverId);
          if(user !== undefined){
               socket.to(user.socketId).emit('typingMessageGet',{
                    senderId : data.senderId,                   
                    reseverId :  data.reseverId,
                    msg : data.msg                    
                     
               })
          }
     })


     socket.on('profileImgChangeSocket',(data)=>{
          const user = findFriend(data.reseverId);
          if(user !== undefined){

               for(var i = 0; i <users.length; i++ ){
                   
                    socket.to(users[i].socketId).emit('profileImgChangeSocketGet',"update_ur_friend_list");
               }



             
          }
     })



     socket.on('logout',userId => {
          userLogout(userId);
     })


     socket.on('disconnect',() =>{
          console.log('user is disconnect... ');
          userRemove(socket.id);
          io.emit('getUser',users);
     })
})

// app.listen(PORT, ()=>{
//      console.log(`Server is running on port ${PORT}`);
// })

server.listen(PORT, () => {
     console.log('listening on *:' + PORT);
   });