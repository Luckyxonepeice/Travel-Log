const {Router} = require('express');
const logSchema = require('../modals/LogEntry');
const route = Router();

route.get('/',async (req,res,next)=>{
    try{

        const data = await logSchema.find();
        res.json(data);
    }
    catch(error){
        next(error)
    }
});

route.post('/',async (req,res,next)=>{
    
    const data = req.body;
    try{
        const log = new logSchema({
            title: data.title,
            rating: data.rating,
            latitude: data.latitude,
            longitude: data.longitude,
            visitedDate: data.visitDate,
            description: data.description,
            comments:data.comments,
            image:data.image,
        });
        const createdEntry = await log.save();
        res.json(createdEntry);
    }catch(error){

        if(error.name=='ValidationError'){
            res.status(422);
        }
        next(error);
    }
});

module.exports=route;