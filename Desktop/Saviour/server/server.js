const express= require('express');
const app=express();

const port =process.env.PORT||5000;
require('dotenv').config();
const dbConfig=require('./config/dbConfig');
app.use(express.json());

const userRoute=require('./routes/userroute');
const inventoryRoute=require('./routes/inventoryroute');
const dashBoardRoute=require("./routes/dashboardroute")
app.use('/api/users',userRoute);
app.use('/api/inventory',inventoryRoute);
app.use('/api/dashboard',dashBoardRoute);
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.listen(
    port,()=> console.log(`Node Js Server Started at ${port}`));
