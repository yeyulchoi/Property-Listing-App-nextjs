import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "@/config/database";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import Property from "@/Models/Properties";
import {FaArrowLeft} from 'react-icons/fa'
import Link from 'next/link'
import { convertToSerializableObject } from "@/utils/convertToObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButton";
import PropertyContactForm from "@/components/PropertyContactForm";

//If your page is in a file located at pages/properties/[id].js or app/properties/[id]/page.js
//Next.js automatically passes params to the component or function responsible for rendering the page.

                   //params here is one of the props. so it is inside {}, params is built-in term
                   // containing the dynamic parts of the URL used by nextjs.therefore params.id.
                   //but can rename it like params:property
const PropertyPage = async ({params}) => {
    await connectDB();
    const propertyDoc= await Property.findById(params.id).lean();  //because the folder above the page is set to be [id], the
                                                                // for object is like { id:'123'}. If it were to be [propertyId]
                                                                //then it would be like { propertyId:'123'}, result in params.id
    
    // lean():The lean() method in Mongoose is used to optimize the query performance 
    //by returning plain JavaScript objects instead of Mongoose documents.
    //These objects don't have any of the methods or metadata that come with Mongoose documents. 
    //It essentially strips down the document to a simple object, which is faster and more lightweight.
    
    //code for serializableobject below is necessary when working with data fetched from MongoDB (or other databases) 
    //that you want to pass to a React component(ui, client side) in a Next.js app.
    
    const property  = convertToSerializableObject(propertyDoc);

    if(!property){
        return(
            <h1 className="text-center text-2xl font-bold mt-10">Property Not Found</h1>
        )
    }
   
    return(
        <>
        
        <PropertyHeaderImage image={property.images[0] } />

        <section>
            <div className="container m-auto py-6 px-6">
                <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-900 flex items-center "
                >
                <FaArrowLeft className="mr-2"/>  Back to Properties
                </Link>
            </div>
        </section>

        <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

                    <PropertyDetails  property={property}/>
                    <aside className="space-y-4">
                        <BookmarkButton property={property}/>
                        <ShareButtons property={property}/>
                        <PropertyContactForm property={property}/>
                    </aside>
              
                </div>
            </div>
        </section>
        
        <PropertyImages images={property.images} />

        </> 
    )
   
    
};
 
export default PropertyPage;