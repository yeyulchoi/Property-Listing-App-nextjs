import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from '@/components/HomeProperties'
import connectDB from '@/config/database'
import FeaturedPRoperties from "@/components/FeaturedProperties";

const HomePage = () => {
    
    return ( 
       <>
       <Hero />
       <InfoBoxes />
       <FeaturedPRoperties />
       <HomeProperties />
       
       </>
       


     
      
    )
}
 
export default HomePage;