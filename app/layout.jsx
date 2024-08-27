import '@/assets/styles/globals.css'   // include global css into the layout

export const metadata = {
  title: 'Property Shows',
  keywords:'rental, property, real estate',
  description: 'Find the perfect rental property'
};

const MainLayout = ({children}) => {
    return ( 
        <html>
            <body>
                <main>{children}</main>
            </body>
        </html>
     );
}
 
export default MainLayout;