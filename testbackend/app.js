require('dotenv').config()
express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Project Routes Import
const authRoutes = require("./routes/auth")

// Mongodb database connection
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.LOCAL_DATABASE_STRING);
  console.log("LOCAL DATABASE CONNECTED");
}

// Middleware 
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())




// Project Routes
app.use("/api", authRoutes);

// Define The Port
const Port = process.env.PORT || 8000;


app.listen(`${Port}`, ()=>{
    console.log(`The app is running on ${Port}...`)
})

