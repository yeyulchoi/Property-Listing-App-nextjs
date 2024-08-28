

const InfoBox = ({heading, backgroundColor='bg-gray-100', children,  textColor='text-gray-800', buttonInfo}) => {
   
    return (
        <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
              <h2 className={`${textColor} text-2xl font-bold`}> {heading}</h2>
              <p className={`${textColor} mt-2 mb-4`}>
                {children}
              </p>
              <a
                href={buttonInfo.link}
                className={`${buttonInfo.backgroundColor} inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
              >
                {buttonInfo.text}
              </a>
        </div>
            
      
    )
    
}
 
export default InfoBox
    