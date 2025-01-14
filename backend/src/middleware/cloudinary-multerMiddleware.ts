import cloudinary from "../config/cloudinaryConfig";
import streamifier from 'streamifier';
import multer, {StorageEngine} from 'multer';
import { UploadApiResponse } from "cloudinary";


export const uploadCauseImageDescription = (fileBuffer:Buffer,folder:string, resourceType:"image"):Promise<UploadApiResponse> =>{
    return new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream({
            folder,resource_type:resourceType,
        },(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result as UploadApiResponse)
            }
        })
        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}

const storage:StorageEngine = multer.memoryStorage();

export const upload = multer({storage});