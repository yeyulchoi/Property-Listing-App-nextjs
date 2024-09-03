
'use client'

import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";



const MessageCard = ({message}) => {
    const [isRead, setIsRead] = useState(message.read);

    const handleReadClick= async()=>{
        const read = await markMessageAsRead(message._id)

        setIsRead(read);
        toast.success(`Marked as ${read? 'read':'new'}`)
    }

    return ( 
        <div className="relative bg-white-p4 rounded-md shadow-md border border-gray-200">
            {!isRead &&(
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
                    New
                </div>
            )}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry:</span>
                {message.property.name}
            </h2>
            <p className="text-gray-700">{message.body}</p>
            <ul>
                <li>
                    <strong>Replay Email:</strong>{' '}
                    <a href={`mailto:@{message.email}`} className="text-blue-500">
                        {message.email}
                    </a>
                </li>
                <li>
                    <strong>Replay Phone:</strong>{' '}
                    <a href={`tel:@{message.phone}`} className="text-blue-500">
                        {message.phone}
                    </a>
                </li>
                <li>
                    <strong>Received:</strong>{' '}
                    {new Date(message.createdAt).toLocaleString()}
                </li>
            </ul>
            <button onClick={handleReadClick}  className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
                {isRead? 'Mark As New':'Mark as Read'}
            </button>
            <button className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md">
                Delete
            </button>
        </div>
      );
}
 
export default MessageCard;