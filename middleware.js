export{ default} from 'next-auth/middleware';

//all routes to be protected
export const config ={
    matcher : ['/properties/add', '/profile', '/properties/saved', '/messages']
}