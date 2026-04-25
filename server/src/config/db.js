// connection with postgres database 
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
});
const connectDB = async () => {
    let client;
    try {
        const client = await pool.connect();
        console.log("Postgre SQL connected successfully");
        client.release();
    } catch (error) {
        console.error("Error connecting to Postgre SQL:", error);
        process.exit(1);
    }
};
export default connectDB;
export { pool };