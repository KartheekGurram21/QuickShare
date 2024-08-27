require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

const app = express();

const port = process.env.PORT || 3001
const uri = process.env.MONGO_URI

app.use(express.json())



app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use('/api/user',userRoutes)

mongoose.connect(uri)
.then(res => {
    console.log("Connected to MongoDB")
})
.catch(err => {
    console.log(err.message)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})