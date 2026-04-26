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
        client = await pool.connect();
        console.log("Connected to the database successfully!");
        const res = await client.query('SELECT NOW()');
        console.log('Connected to PostgreSQL at:', res.rows[0].now);
    } catch (error) {
        console.error("Error connecting to Postgre SQL:", error);
        process.exit(1);
    } finally{
        if (client) {
            client.release();
            console.log('Database client released back to pool')
        }
    }
};
export default connectDB;
export { pool };