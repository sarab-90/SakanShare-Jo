import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();
console.log('Starting server...   hi sarab');