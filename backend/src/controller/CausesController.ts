import { Request, Response } from 'express';
import { Cause } from '../model/CausesModel';
import { uploadCauseImageDescription } from '../middleware/cloudinary-multerMiddleware';
import deleteImageFromCloudinary from '../middleware/deleteImageFromCloudinary';
// This create interface for requestbody
interface CauseRequestBody {
    title: string;
    description: string;
    image: string;
}


export interface CustomRequest extends Request {
    file?: Express.Multer.File | undefined;
    body: CauseRequestBody;
}

// This extends Request from express to get its propreties


const createCause = async (req: CustomRequest, res: Response) => {

    try {
        const { title, description } = req.body;
        if (!title || !description) {
            res.status(400).json({ message: 'Title and description are required' });
            return;
        }

        if (!req.file || !req.file.buffer) {
            res.status(400).json({ message: 'Image file is required' });
            return;
        }

        const imageUrl = await uploadCauseImageDescription(req.file.buffer, 'cause/image', 'image');

        const newCause = new Cause({
            title,
            description,
            image: imageUrl.secure_url,
        });

        await newCause.save();
        res.status(201).json({ status: 'success', causes: newCause });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const getAllCauses = async(req:Request,res:Response)=>{

    try{
        const causes = await Cause.find();
        res.status(200).json({status:'success',causes})
    }catch(err:unknown){
        if(err instanceof Error){
            res.status(500).json({message:err.message})
        }else{
            res.status(500).json({message:'An unknown error occurred'})
        }
    }
}

const getSingleCause = async(req:Request,res:Response) =>{
    try{
        const {id} = req.params;
        const cause = await Cause.findById(id);
        if(!cause){
            res.status(404).json({message:'Cause not found'})
            return;
        }

        res.status(200).json({cause});
    }catch(err:unknown){
        if(err instanceof Error){
            res.status(500).json({message:err.message})
        }else{
            res.status(500).json({message:'An unknown error occurred'})
        }
    }
}

const updateSingleCause = async(req:Request,res:Response) =>{
    try{
        const {id} = req.params;
        const {title,description} = req.body;

        const cause = await Cause.findById(id);
        if(!cause){
            res.status(404).json({message:'Cause not found'})
            return;
        }

        const updates: Partial<{title:string,description:string, imageUrl:string}> = {};
        if(title) updates.title = title;
        if(description) updates.description = description;


        if(req.file?.buffer){
            const imageUrl = await uploadCauseImageDescription(req.file.buffer,'cause/image','image')
            updates.imageUrl = imageUrl.secure_url;
        }
        
        const updatedCause = await Cause.findByIdAndUpdate({id},updates,{new:true})
        res.status(200).json({ status: 'success', cause: updatedCause });
    }catch(err){
        if(err instanceof Error){
            res.status(500).json({message:err.message})
        }else{
            res.status(500).json({message:'An unknown error occurred'})
        }
    }
}


const deleteSingleCause = async(req:Request,res:Response) =>{
    try {
        const { id } = req.params;

        const cause = await Cause.findById(id);
        if (!cause) {
            res.status(404).json({ message: 'Cause not found' });
            return;
        }

        // Delete the associated image
        if (cause.image) {
            await deleteImageFromCloudinary(cause.image);
        }

        await Cause.findByIdAndDelete(id);

        res.status(200).json({ status: 'success', message: 'Cause deleted successfully' });
    }catch(err){
        if(err instanceof Error){
            res.status(500).json({message:err.message})
        }else{
            res.status(500).json({message:'An unknown error occurred'})
        }
    }
}



export  {createCause, getAllCauses, getSingleCause, updateSingleCause, deleteSingleCause };