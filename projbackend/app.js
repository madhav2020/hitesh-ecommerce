require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express");
const app = express()

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// routers exports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

// DB Connection
mongoose.connect(process.env.DATABASE_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED SUCCESSFULLY")
});

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Project Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);



// ports
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`the app is running on port ${port}...`);
});