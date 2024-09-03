import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css'   // include global css into the layout
import { GlobalProvider } from '@/context/globalContext';
import 'photoswipe/dist/photoswipe.css'






export const metadata = {
  title: 'Property Shows',
  keywords:'rental, property, real estate',
  description: 'Find the perfect rental property'
};


const MainLayout = ({children}) => {
    return ( 
        <AuthProvider>
          <GlobalProvider>
            <html>
                <body>
                    <Navbar/>                    
                    <main>{children}</main>
                    <Footer/>
                    <ToastContainer />
                </body>
            </html>
          </GlobalProvider>            
        </AuthProvider>
        
     );
}
 
export default MainLayout;