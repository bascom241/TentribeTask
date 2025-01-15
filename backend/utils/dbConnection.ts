import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
// Configuration for the env file 


// Function to connect to DataBase
const connectDb = async () => {
    const db_url = process.env.MONGO_URL;
  
    try {
      if (!db_url) {
        throw new Error("No Database URL Provided");
      }
      await mongoose.connect(db_url);
      console.log("Database Connected");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Database Connection Error:", err.message);
        console.log(err);
      } else {
        console.error("An unknown error occurred while connecting to the database.");
      }
    }
  };

export default connectDb