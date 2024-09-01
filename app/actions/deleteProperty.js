'use server'
import cloudinary from "@/config/cloudinary"
import connectDB from "@/config/database"
import Property from "@/Models/Properties"
import {getSessionUser} from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

//note:
//map()=>() vs. map()=>{}
//Use () when you want an implicit return and you're directly returning JSX.
//when you need to perform additional logic or have multiple statements, 
//and remember to use return to return the JSX.

//The actions directory typically contains functions that handle various data-related
// operations that are executed on the server.
// Actions are generally used to perform operations that modify data or state on
// the server. This includes operations like creating, updating, or deleting database records.

async function deleteProperty(propertyId) {

    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required')
    }
    
    const {userId} =sessionUser;

    const property = await Property.findById(propertyId)
    if(!property) throw new Error('Property is not found.')

        //verify ownership


    if(property.owner.toString() !== userId){
        throw new Error('Unauthorized');
    }
    //extract public ID from image URL
    const publicIds =property.images.map((imageUrl)=>{
        const parts=imageUrl.split('/');
        return parts.at(-1).split('.').at(0)
    })

    //delete images from Cloudinary
    if(publicIds.length >0){
        for(let publicId of publicIds){
            await cloudinary.uploader.destroy('propertyShow/'+publicId)
        }
    }
    await property.deleteOne()

    revalidatePath('/','layout');




}

export default deleteProperty