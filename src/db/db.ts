import mongoose from "mongoose";
const dbConnection = async (): Promise<void> => {
   try {
       await mongoose.connect(process.env.MONGODB_URI || "");
       console.log("Database Connected successfully.");
   }catch(e) {
       console.log("database connection failed:  ",e);
   }
}

export default dbConnection;