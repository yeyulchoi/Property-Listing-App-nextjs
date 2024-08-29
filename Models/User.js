import mongoose from "mongoose";  //import entire mongoose module
import  {models, model,Schema} from "mongoose"; //destructure schema


const UserSchema = new Schema({
    email:{
        type:String,
        unique:[true, 'Email already exists'],
        required:[true, 'Email is required.']
    },
    username:{
        type:String,
        required:[true, 'Username is required.']
    },
    image:{
       
        required:[true, 'Email is required.']
    },
    bookmarks:{
        type:Schema.Types.ObjectId,
        ref:'Property'       
    }
},
{
    timestamps:true  //Mongoose automatically add createdAt and updatedAt fields to track when doc is created and updated
})

const User = models.User || model('User', UserSchema)  //checks for an existing User model in the Mongoose cache and creates it if not found.

export default User   // be careful. do not use exports which is invalid.