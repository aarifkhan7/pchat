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
dotenv.config({
     path : 'config/config.env'
})


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

app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`);
})