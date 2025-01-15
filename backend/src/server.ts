import app from "./app";
import dotenv from "dotenv";
import connectDb from "../utils/dbConnection";
// All Import 


// Configuration settings to read dotenv file 
dotenv.config();

const port = process.env.PORT || 4000;
// Default port to 3000 


app.listen(port, async ()=>{
    await connectDb();
    console.log(`Server is running on port ${port}`)
})