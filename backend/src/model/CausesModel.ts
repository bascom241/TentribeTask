import { timeStamp } from "console";
import mongoose from "mongoose";


const CauseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'cause title is required']
    },
    description:{
        type:String,
        required:[true, 'cause description is required']
    },
    image:String,
    contributions:[
        {
            name:{
                type:String,
                required:[true, "Name is required to Contribute"]
            },
            email:{
                type:String,
                required:[true, "Email is required to Contribute"]
            },
            amount:{
                type:Number,
                required:[true, "Amount is required to Contribute"]
            }
        }
    ]

},{timestamps:true})

export const Cause= mongoose.model('Cause',CauseSchema);

