import axios from "axios"

export const ImageUploadService =async(data:FormData) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || null
    
    if(!backendUrl){
        alert('backend url not get')
    }
    
    const response = await axios.post(`${backendUrl}/api/upload_image`,data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response?.data
}