
// import properties from '@/properties.json' (Replace json file with MongoDB)

import PropertyCard from '@/components/PropertyCard'
import connectDB from '@/config/database';
import Property from '@/Models/Properties';
import Pagination from '@/components/Pagination';

const PropertiesPage = async({searchParams:{page=1, pageSize=2}}) => {
    
    await connectDB();
    const skip = (page-1) * pageSize; 
    
    const total = await Property.countDocuments({})

    const properties =await Property.find({}).skip(skip).limit(pageSize)   // {} means: no filter meaning all documents in the collection.
                                //.lean() =>.lean() gives you a simpler, plain JavaScript object.
                                        //You can't use Mongoose-specific methods (like save, validate, etc.) on these objects.
                                        //When you only need to read data without using Mongoose methods
                                        // Without lean()(Mongoose Document):returns full Mongoose documents with methods and additional metadata.
                                                    //:When you need to use Mongoose methods for document updates                            
// with those two lines, fetching data  ( rather than create API route, useState etc.)

    const showPagination = total>pageSize;
    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                { properties.length === 0 ?(<p>No Properties found</p>):
                (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {
                            properties.map((property)=>(
                                <PropertyCard key={property._id} property={property}/>
                            ))
                        }

                    </div>
                )}
                { showPagination &&( <Pagination page={parseInt(page)}  pageSize={parseInt(pageSize)} totalItems={total}/>)}
               
            </div>
        </section>
    )
    




}

 
export default PropertiesPage;