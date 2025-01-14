import {v2 as cloudinary} from 'cloudinary';


const deleteImageFromCloudinary = async(imageUrl:string) =>{
    try{

        // Split the url int component based on th / 
        const urlParts = imageUrl.split('/');

        // Extract the last string 
        const fileNameWithExtension = urlParts[urlParts.length - 1]; 

        // seprete it 
        const publicId = fileNameWithExtension.split('.')[0];

        if(!publicId){
            throw new Error('Invalid Image URL')
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== 'ok') {
            throw new Error(`Failed to delete image from Cloudinary: ${result.result}`);
        }

        console.log(`Image with public ID ${publicId} deleted successfully.`)
    }catch(err:unknown) {
        if(err instanceof Error){
            console.log(err.message)
        }else{
            console.log('An unknown error occurred')
        }
    }
}

export default deleteImageFromCloudinary;