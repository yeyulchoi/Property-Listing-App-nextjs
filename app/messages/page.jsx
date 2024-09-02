import connectDB from "@/config/database";
// import User from "@/Models/User";
import Property from "@/Models/Properties";
//instead of import Property model like the above, in order to populate method...
// import '@/models/Property'

// This form of import is usually used when the module being imported performs 
//some kind of setup or configuration on its own, such as connecting to
// a database, registering models with a library like Mongoose, or
// running some initialization code.


import { convertToSerializableObject } from "@/utils/convertToObject";
import Message from "@/Models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/MessageCard";


const MessagesPage = async() => {
    await connectDB();

    const sessionUser = await getSessionUser()
    const {userId} = sessionUser

    const readMessages = await Message.find({recipient: userId, read: true})
                            .sort({createdAt:-1})
                            .populate('sender','username')
                            .populate('property','name')
                            .lean();
    const unreadMessages = await Message.find({recipient: userId, read: false})
                            .sort({createdAt:-1})
                            .populate('sender','username')
                            .populate('property','name')
                            .lean();

    const messages =[...unreadMessages, ...readMessages].map((messageDoc)=>{
        const message =convertToSerializableObject(messageDoc);
        message.sender=convertToSerializableObject(messageDoc.sender);
        message.property = convertToSerializableObject(messageDoc.property)

        return message;
    })

    return <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Message</h1>
                    <div className="space-y-4">
                        {messages.length ===0 ?( <p>You have no messages</p> ):(
                            messages.map((message)=>(
                                <MessageCard  key={message._id} message={message}/>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </section>
    

}
 
export default MessagesPage;