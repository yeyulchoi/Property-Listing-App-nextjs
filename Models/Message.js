import mongoose from "mongoose";  //import entire mongoose module
import {models, model,Schema} from "mongoose"; //destructure schema


const MessageSchema = new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    recipient:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    property:{
        type:Schema.Types.ObjectId,
        ref:'Property',
        required:true,
    },
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    phone:String,
    body:String,
    read:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true  //Mongoose automatically add createdAt and updatedAt fields to track when doc is created and updated
})

const Message = models.Message || model('Message', MessageSchema)  //checks for an existing User model in the Mongoose cache and creates it if not found.

export default Message   // be careful. do not use exports which is invalid.