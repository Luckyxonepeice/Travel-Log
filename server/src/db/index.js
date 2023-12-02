const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
}).then( ()=>{
    console.log("Db is connected!")
}).
catch( (err)=>{
    console.log("Error found!",err)
})