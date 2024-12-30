import React, { useEffect, useState } from "react"
import {ImageUploadService} from '../../services/ImageUploadService'
import ExtractedData, { ExtractedDataProps } from "./ExtractedData"
import LoadingSpinner from "./LoadingSpinner"
import validateImageAspectRatio from '../../utils/validateAspectRatio.ts'

const ImageUpload = () => {
    const [frontImage , setFrontImage ] = useState<File | null>(null)
    const [ backImage , setBackImage ] = useState<File | null>(null)
    const [frontImagePrev , setFrontIMagePrev ] = useState<string | null>(null)
    const [backImagePrev , setBackIMagePrev ] = useState<string | null>(null)
    const [ loading , setLoading ] = useState<boolean>(false)
    const [extractedData , setExtractedData ] = useState<ExtractedDataProps | null>(null)
    const [error ,setError ] = useState<string | null>(null)

    useEffect(() => {
        const timer =setTimeout(() => {
            setError(null)
        },1000)
        return clearTimeout(timer)
    },[error])

    const handleFileChange =async (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name , files } = e.target
        if(files && files[0]){
            const imageFile = files[0]

            // Check the image aspect / ratio
            const isValidRatio = await validateImageAspectRatio(imageFile)
            console.log('isValidRatio :',isValidRatio)

            if (imageFile.size > 2 * 1024 * 1024) { // 2MB limit
              setError('File size must be less than 2MB.')
              return;
            }

            const imgUrl = URL.createObjectURL(imageFile)
            if(name === 'front-image'){
                setFrontImage(files[0])
                setFrontIMagePrev(imgUrl)
            }else if(name === 'back-image'){
                setBackImage(files[0])
                setBackIMagePrev(imgUrl)
            }
        }
    }

    

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!frontImage || !backImage) {
            alert('Please select both images');
            return;
        }

        const formData = new FormData()
        formData.append('frontImage',frontImage)
        formData.append('backImage',backImage)
        try {
            setLoading(true)
            const response = await ImageUploadService(formData)
            if(response?.status){
                setExtractedData(response.data)
            }else if(!response?.status){
                setError(response?.error)
            }
            setLoading(false)
        } catch (error) {
          setLoading(false)
            console.log('Error uploading images',error)
        }
        
    }
    return (    
        <div className="min-h-screen flex md:flex-raw">
      {/* Left Section - 40% */}
      <div className="w-full md:w-2/5 bg-white p-6 border-r">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold text-white mb-4">
            Aadhar Card Verification
          </h1>
          <p className="text-white mb-6">
            Upload your aadhar card images to get the data automatically
          </p>
          {error && (<p className="text-white text-sm mb-2 p-1 bg-red-500 rounded-md text-center">{error}</p>)}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Front Image Section */}
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700 font-medium mb-2">Front Image</p>
              <input 
                type="file" 
                name="front-image" 
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg"
                maxLength={1}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" 
              />
              {/* Front Image Preview Box */}
              <div className="mt-4 w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                {frontImagePrev ? (
                  <img 
                    src={frontImagePrev} 
                    alt="Front Preview" 
                    className="max-w-full max-h-full object-contain rounded-lg" 
                  />
                ) : (
                  <p className="text-gray-400">Front image preview will appear here</p>
                )}
              </div>
            </div>

            {/* Back Image Section */}
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700 font-medium mb-2">Back Image</p>
              <input 
                type="file" 
                name="back-image" 
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg"
                maxLength={1}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" 
              />
              {/* Back Image Preview Box */}
              <div className="mt-4 w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                {backImagePrev ? (
                  <img 
                    src={backImagePrev} 
                    alt="Back Preview" 
                    className="max-w-full max-h-full object-contain rounded-lg" 
                  />
                ) : (
                  <p className="text-gray-400">Back image preview will appear here</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={!backImagePrev && !frontImagePrev}
            >
              {loading ? (
                <>
                  <LoadingSpinner className="w-5 h-5" />
                  Processing...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - 60% */}
      <div className="w-full md:w-3/5 bg-white p-6">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner className="w-8 h-8" />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
              {extractedData && <ExtractedData loading data={extractedData} />}
            </div>
          )}
        </div>
      </div>
    </div>
    )

}
export default ImageUpload