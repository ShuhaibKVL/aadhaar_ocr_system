import { extractAadhaarDetails } from '../services/extractAadhaarDetails.js';

export const extractImage = async(req,res) => {
    try {
        console.log('files',req.files)
        const frontImage = req.files.frontImage[0];
        const backImage = req.files.backImage[0];
        console.log('front-image :',frontImage)
        console.log('back-image :',backImage)

        // Validate if files exist
        if (!frontImage || !backImage) {
            return res.status(400).json({ status:false,error: 'Both front and back images are required' });
        }
        const validTypes = ['image/png', 'image/jpeg','image/jpg'];
        console.log('front-image-type :',frontImage.mimetype)
        console.log('backe-image-type :',backImage.mimetype)
        if (!validTypes.includes(frontImage.mimetype) || !validTypes.includes(backImage.mimetype)) {
            return res.status(200).json({status:false, error: 'Only PNG and JPG/JPEG/JPG images are allowed.' });
        }

        const frontImagePath = frontImage?.path
        const backImagePath = backImage?.path

        const frontImageData = await extractAadhaarDetails(frontImagePath,'front')
        console.log('frontImage :',frontImageData)
        const backImageData = await extractAadhaarDetails(backImagePath,'rear')
        console.log('backImage :',backImageData)

        // send the function false if both data not get
        if (!frontImageData.success || !backImageData.success) {
            return res.status(200).json({status:false, error: 'Images not extracted..! Please upload a proper aadhaar image' });
        }
        return res.status(200).json({
            status:true,
            data:{
                frontImageData:frontImageData?.data,
                backImageData:backImageData?.data
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({status:false,error:error?.message});
    }
}
