const mongoose = require('mongoose');
const {Schema}= mongoose;

const reqString = {
    type:String,
    required: true,
};

const logEntrySchema = new Schema({

    title:reqString,

    description: String,

    comments: String, 

    image: String,

    rating:{
        type:Number,
        min:0,
        max:10,
        default:0,
    },

    latitude:{
        type:Number,
        required: true,
        min:-90,
        max:90,
    },

    longitude:{
        type: Number,
        required: true,
        min:-180,
        max:180,
    },

    visitedDate:{
        type:Date,
        required: true,
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("LogEntry",logEntrySchema);