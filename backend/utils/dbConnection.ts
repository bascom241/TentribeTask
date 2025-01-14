import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
// Configuration for the env file 


// Function to connect to DataBase
 

const connectDb = async () =>{
    let  db_url = process.env.MONGO_URL

    try{
        if(!db_url){
            throw new Error('No Database URL Provided')
        }
        await mongoose.connect(db_url);
        console.log('Database Connected')
    
    }catch(err:unknown){
        if(err instanceof Error){
            console.log(err.message)
        }else{
            console.log('An unknown Error')
        }
    }
    
}

export default connectDb