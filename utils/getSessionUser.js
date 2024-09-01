import { getServerSession } from "next-auth";
import { authOptions} from "@/utils/authOptions"


const getSessionUser = async() => {
  
    const session = await getServerSession(authOptions);
     //used  to retrieve the current session on the server side.

    if (!session || !session.user){
        return null;
    }

    return {
        user: session.user,
        userId: session.user.id
    }
    //The structure of this session object is predefined by NextAuth.js 
    //and typically looks something like this:
    // {
    //     user: {
    //       name: "John Doe",
    //       email: "john@example.com",
    //       image: "https://example.com/profile.jpg",
    //       id: "abc123"
    //     },
    //     expires: "2024-09-01T00:00:00.000Z"
    //   }
  }
  

 
export default getSessionUser;
// regarding  Named export vs. default export:
// if you want to import in the form of {getSessionUser}, then  export {getSessionUser} should be written here.

