
import GoogleProvider from "next-auth/providers/google"
import connectDB from '@/config/database'
import User from "@/Models/User"

export const authOptions = {
  // Configure one or more authentication providers// this object contains confi settings for nextauth.js  including auth providers and callback functions
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization:{
        params:{
            prompt:'consent', // consent prompts the user to select an account each time
            access_type:'offline', // offline: allow the app to get a refresh token to maintain access to the users' account even when they not logged in
            response_type:'code' // code: the authorization code flow should be used.
        }
      }
    }),
    // ...add more providers here

  ],    // OAuth: open authentication :  a way to grant websites or applications limited access to a user's data without exposing the user's credentials.
  callbacks:{    // callback obj: contains functions that are executed at different stage of authentication process
    //invoked on successful sign in 
    async signIn({profile}){  //profile object is provided by NextAuth.js during auth process.  /contains profile information retrieved from the OAth provider(in thiscase, Google) after a successful sign in.
        //1.connect to the DB
       
        await connectDB();

        //2. check if user exists
        const userExists = await User.findOne({email:profile.email})
        //3.if not, create user
        if(!userExists){
          //Truncate username if too long
          const username=profile.name.slice(0,20);
          await User.create({    //  this handle creation of a user record in the application's database based on the information retrieved from exisiting google acct.
            email: profile.email, 
            username,
            image:profile.picture
          });
        }
        // 4. return true to allow sign in
        return true;
    },
    // session  callback function that modifies the session object
    async session({session}){  //This line queries the database to find a user record that matches the email address associated with the current session.
        //1. get user from db
        const user =await User.findOne({
          email:session.user.email
        });
        //2. assign user id from the session
        
        session.user.id = user._id.toString();  //This ensures that the session now includes the user's unique identifier, which can be used in the application to reference the user in subsequent operations.
        
        //3.return session
        return session; //This returns the modified session object, now including the user's unique id, to the rest of the application.
        //The session object is used throughout the application to manage user authentication state. By returning the session with the id field, any part of the application that accesses the session can also access the user's unique identifier.
    }
  }
}

// export default NextAuth(authOptions)