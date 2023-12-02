const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const logs = require('./api/logs')

require('dotenv').config({path: "./vars/.env"});

const {notFound,errorHandler}= require('./middlewares')

require('./db');

const app= express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
}));


app.use(express.json())

app.use(helmet());

app.use(morgan('common'));

app.get('/', (req,res)=>{
    res.json({
        message:"Hello World!",
    });
});

app.use('/api/logs',logs);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Listening in Port:-${port}`);
});
