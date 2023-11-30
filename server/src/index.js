const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({path: "./vars/.env"});

const {notFound,errorHandler}= require('./middlewares')

const app = express(cors({
    origin:process.env.CORS_ORIGIN,
}));

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
}).then( ()=>{
    console.log("Db is connected!")
}).
catch( (err)=>{
    console.log("Error found!",err)
})


app.use(helmet());
app.use(morgan('common'));

app.get('/', (req,res)=>{
    res.json({
        message:"Hello World!",
    });
});

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Listening in Port:-${port}`);
});
