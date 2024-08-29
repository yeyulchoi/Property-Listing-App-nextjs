
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization:{
        params:{
            prompt:'consent',
            access_type:'offline',
            response_type:'code'
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks:{
    //invoked on successful sign in 
    async singIn({profile}){
        //1.connect to the DB
        //2. check if user exists
        //3.if not, create user
        // 4. return true to allow sign in

    },
    //session  callback function that modifies the session object
    async sessino({session}){
        //1. get user from db
        //2. assign user id from the session
        //3.return session
    }
  }
}

export default NextAuth(authOptions)