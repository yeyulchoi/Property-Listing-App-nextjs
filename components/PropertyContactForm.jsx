
'use client'
import { useEffect } from "react";
import {useFormState,  useFormStatus} from 'react-dom' // if react version is 19 use different useActionState?
import { useSession } from "next-auth/react";
import addMessage from "@/app/actions/addMessage";
import { toast } from "react-toastify";
import SubmitMessageButton from "./SubmitMessageButton";

const PropertyContactForm = ({property}) => {
//The useSession hook from NextAuth.js is used to manage and access the current user's authentication session in your application.
// It provides information about the user's login status and session details, such as the user's data (e.g., name, email) and session expiration. 
const{data:session}=useSession();
          //@@@@ addMessage is passed in useFormState, we need to add previousState as the first argument in the addMessage-- need study . why.
const [state, formAction] = useFormState(addMessage, {})  // addMessage is always return true (refer to addMessage return part)
              // this formAction is <form action=''> // addMessage is passed , we can access formAction
useEffect(()=>{
  //this error is taken from the addMessage in userId===recipient part.
  if(state.error) toast.error(state.error)
  if(state.submitted) toast.success('Message sent successfully')
},[state])


//.submitted is taken from the addMessage return object {submitted: true}
if(state.submitted){
  return (
    <p className="text-green-500 mb-4">Your message has been sent</p>
  )
}

    return  session &&( 
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
              <form action={formAction}>
                <input type="hidden" id='property' name='property' defaultValue={property._id}/>
                <input type="hidden" id='recipient' name='recipient' defaultValue={property.owner}/>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="body"
                  >
                    Message:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="body"
                    name="body"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div>
                <SubmitMessageButton />
                </div>
              </form>
            </div>  
            )
     
}
 
export default PropertyContactForm;