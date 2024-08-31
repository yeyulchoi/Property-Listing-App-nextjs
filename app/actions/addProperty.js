'use server'
import connectDB from "@/config/database";
import Property from "@/Models/Properties";
import getSessionUser from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";


   


 //formData: teh result of a form submission/// new  FormData() dont have to use it in nextjs' server action. When a form submission is handled on the server, formData object is automatically availabel
async function addProperty(formData){       // Pass the addProperty function to form id attribute, the function is called, formData is automade
    
    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required');
    }


    const {userId} =sessionUser;
       
    
   
    //access all values from amenities and images
    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images')
                            .filter((image) => image.name !=='')
                           
                            

const propertyData ={
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location:{
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode')
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates:{
        nightly: formData.get('rates.nightly'),
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
    },
    seller_info:{
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
    },
    
}

const imageUrls =[]

for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));//Converts the Unit8Array into a regular JavaScript array.  ### be careful!!! Uint8, not Unit!!!
    const imageData =Buffer.from(imageArray);

    //convert to base64
    const imageBase64 = imageData.toString('base64');  //Converts the Buffer to a Base64 encoded string. This is necessary for uploading images to Cloudinary as Base64 encoded data.

    //Make request to cloudinary //Uploads the Base64 encoded image data to Cloudinary.
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`,{ folder:'propertyShow'})
//Adds the URL of the uploaded image (returned by Cloudinary) to the imageUrls array. This URL can be used to access the image from Cloudinary.
    imageUrls.push(result.secure_url);
}
propertyData.images = imageUrls;

const newProperty = new Property(propertyData);
await newProperty.save()  //saved in db

revalidatePath('/','layout');
redirect(`/properties/${newProperty._id}`)
}


export default addProperty