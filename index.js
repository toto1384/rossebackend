const express = require('express');
const mongoose = require('mongoose');
const argv = require('optimist').argv;
const app = express();

//Imports
const authRoute = require('./routes');


//Connect to db
mongoose.connect('mongodb://' + argv.be_ip + ':80/test',
    { useNewUrlParser: true,useUnifiedTopology: true },
    function(){console.log('Connected to db');});

//Route middlewares
app.use(express.json());
app.use('/api',authRoute);

app.listen(8080, argv.fe_ip);
