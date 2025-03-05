import { config } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try{
    mongoose.connection.on('connected', () => {
      console.log("db connect sucessfully")
    });
    mongoose.connection.on('error', (err) => {
      console.log("error to  connect db", err)
    })
    await mongoose.connect(config.dburl)

 
  }catch(err){

    console.error("failde to connect",err)
    process.exit(1); //stop 
  }
 
};

export default connectDB;
