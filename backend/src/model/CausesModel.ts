import { timeStamp } from "console";
import mongoose from "mongoose";


const CauseSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:[true, 'cause tittle is required']
    },
    description:{
        type:String,
        required:[true, 'cause description is required']
    },
    image:String,

},{timestamps:true})

export const Cause= mongoose.model('Cause',CauseSchema);

