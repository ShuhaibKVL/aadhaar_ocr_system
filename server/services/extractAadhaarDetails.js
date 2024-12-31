import Tesseract from 'tesseract.js';

function getName(text) {
    // const namePattern = text.match(/(?:Name|നാമം|नाम)[\s:]+([A-Za-z\s]+)/i);
    const namePattern = /Government of India[\s\S]*?\n(?:[a-z\s]*)?([A-Z][a-zA-Z\s]+)/;

    let name = null;
            const match = text.match(namePattern);
            name = match ? match[1].trim() : null;
    return name
  }


export const extractAadhaarDetails = async(imagePath,mode) => {
    try {

        // Perform OCR
        const result = await Tesseract.recognize(
            imagePath,
            'eng',
            {
                // logger: m => console.log('OCR Progress:', m),
                tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '
            }
        );

        const text = result.data.text;
        // console.log('Extracted Text:', text);

        if(mode === 'front'){
            // Extract Aadhaar number (12 digits, possibly with spaces)
            const aadhaarMatch = text.match(/[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}/);
            const aadhaarNumber = aadhaarMatch ? aadhaarMatch[0] : null;

            const name = getName(text)

            // Extract DOB
            const dobMatch = text.match(/(?:\d{2}\/\d{2}\/\d{4})|(?:\d{2}-\d{2}-\d{4})/);
            const dob = dobMatch ? dobMatch[0] : null;


            // Extract gender
            const gender = text.toLowerCase().includes('male') ? 'MALE' : 
                          text.toLowerCase().includes('female') ? 'FEMALE' : null;

            if(!aadhaarNumber || !name){
                return {success:false,error:'Upload a exact aadhaar card front image.'}
            }
            return {
                success: true,
                data: {
                    aadhaarNumber,
                    name,
                    dob,
                    gender,
                    rawText: text
                }
            };
        }else if(mode === 'rear'){

            // Extract C/O  name
            const coMatch = text.match(/C\/O:\s*([^,\n]+)/)
            const coDetails = coMatch ? coMatch[1].trim() : null;

            // Extract S/O name
            const soMatch = text.match(/S\/O:\s*([\w\s]+?),/)
            const soDetails = soMatch ? soMatch[1].trim() : null;

            // Extract pincode 
            const pincodeMatch = text.match(/\b(\d{6})\b/)
            const pincode = pincodeMatch ? pincodeMatch[1] : null;

            //Extract address
            const addressMatch = text.match(/(?:S\/O|C\/O):[^,\n]+,\s*([\s\S]*?)\b\d{6}\b/);
            const address = addressMatch ? addressMatch[1].trim() : null
            console.log('addressMatch :',addressMatch)
            console.log('address :',address)

            if(!pincode){
                return {
                    success:false,
                    error:"Upload a exact back image of your aadhaar"
                }
            }
            return {
                success:true,
                data:{
                    pincode,
                    coDetails,
                    soDetails,
                    address,
                    rawText:text
                }
            }
        }

        
    } catch (error) {
        console.error('OCR Error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};