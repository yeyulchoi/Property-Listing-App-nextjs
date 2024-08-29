import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider';
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
                </body>
            </html>
        </AuthProvider>
        
     );
}
 
export default MainLayout;