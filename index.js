require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const morgan=require('morgan')

const cors= require('cors')
app.use(cors())
app.use(cors({
  origin: 'http://localhost:4000' // Allow only requests from this origin
 }));
const authenticationRoute = require('./routes/authenticationRoute');
const getUserRoute=require('../server/routes/getUserRoute')
const getproductRoute=require('./routes/getproductRoute')
// Now you can use authRoute as required

const url = "mongodb://127.0.0.1:27017/hkStore";
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Parse incoming request bodies
app.use('/authentication', authenticationRoute)
app.use('/getUser', getUserRoute)
app.use('/getProduit',getproductRoute)

app.use(morgan('dev'))


 
//connection to data base
async function connectDB() {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
}

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});