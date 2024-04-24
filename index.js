console.log('Server is starting...')
// kieranpeel // p4cgqja2BdW8pSWG
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require("cors");
const PTRouter = require('./routes/pricingTool.route');

// This is the middleware that allows us to parse the request body
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));


//routes 
app.use('/', PTRouter);

// Connect to MongoDB
mongoose.connect('mongodb+srv://kieranpeel:p4cgqja2BdW8pSWG@backendtest.3etqmzq.mongodb.net/PT_Backend_Server?retryWrites=true&w=majority&appName=BackendTest').then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3001, () => {
        console.log('Server is running on port 3001...')
    })
 }).catch(() => {
    console.log('Connection failed')
});
