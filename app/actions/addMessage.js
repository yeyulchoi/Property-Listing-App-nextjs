'use server'
import connectDB from "@/config/database";
import Message from "@/Models/Message";
import {getSessionUser} from "@/utils/getSessionUser"



// if react version is 19 useActionState
//if react version is 18 useFormState

async function addMessage(previousState,formData){       // Pass the addMessage function to form id attribute, the function is called, formData is automade
    // addMessage is passed to useFormState. 
    //useFormState has two arguments: 1st- previouse object(or initial state), 2nd argument is function that has value and validate the values
    // the result shows through useEffect.
    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required');
    }

    const {userId} =sessionUser;

    const recipient = formData.get('recipient')
    if(userId===recipient){
        return {error:'You cannot send a message to yourself.'}
    }

    const newMessage= new Message({
        sender: userId,
        recipient,
        property: formData.get('property'),
        name:formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('body')
    })

    await newMessage.save()

    return {submitted: true};
       
                      
}
  

export default addMessage