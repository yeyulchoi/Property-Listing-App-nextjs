import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import '@/assets/styles/globals.css'   // include global css into the layout







export const metadata = {
  title: 'Property Shows',
  keywords:'rental, property, real estate',
  description: 'Find the perfect rental property'
};


const MainLayout = ({children}) => {
    return ( 
        <AuthProvider>
            <html>
                <body>
                    <Navbar/>
                    <main>{children}</main>
                    <Footer/>
                    <ToastContainer/>
                </body>
            </html>
        </AuthProvider>
        
     );
}
 
export default MainLayout;