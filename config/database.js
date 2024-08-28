import mongoose from 'mongoose'

let connected= false;

const connectDB = async ()=>{
    
    mongoose.set('strictQuery',true)
    

    //if db is already connected, don't connect it again.

    if(connected){
        console.log('MongoDB is already connected.')
        return;
    }

    //connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        connected=true;

    } catch (error) {
        console.log(error)
        
    }
}

export default connectDB