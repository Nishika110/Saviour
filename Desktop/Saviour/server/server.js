const express= require('express');
const app=express();

const port =process.env.PORT||5000;
require('dotenv').config();
const dbConfig=require('./config/dbConfig');
app.use(express.json());

const userRoute=require('./routes/userroute');

app.use('/api/users',userRoute);
app.listen(
    port,()=> console.log(`Node Js Server Started at ${port}`));
