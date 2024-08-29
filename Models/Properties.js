import mongoose from "mongoose";
import  {models,model, Schema} from "mongoose";



const PropertySchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    name:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    location:{
        
        street:String,
        city:String,
        state:String,
        zipcode:String,      
    },
    beds:{
        type:Number,
        required:true
    },
    baths:{
        type:Number,
        required:true
    },
    square_feet:{
        type:Number,
        required:true
    },
    amenities:[{
        type:String,        
    }],
    rates:{
        nightly:Number,
        weekly:Number,
        monthly:Number,
    },
    seller_info:{
        name:String,
        email:String,
        phone:String,
    },
    images:[
        {
            type:String
        }
    ],
    is_featured:{
        type:Boolean,
        default:false,
    },

},
{
    timestamps:true  //Mongoose automatically add createdAt and updatedAt fields to track when doc is created and updated
})

const Property = models.Property || model('Property', PropertySchema)  //checks for an existing User model in the Mongoose cache and creates it if not found.
//models.Property:  Property model already exist in the Mongoose model cache
//model(,)  if Property model doesn't exist, this creates a new model using the provided schema.
export default Property   // be careful. do not use exports which is invalid.