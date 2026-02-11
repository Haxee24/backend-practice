import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './db/database.js';
import app from './app.js'


dotenv.config({
    path: './.env'
});

(async () => {
    try{
        await connectDB();

        const server = app.listen(process.env.PORT || 3000, () => {
            console.log(`Serving at ${process.env.PORT||3000}`)
        })
        server.on("error", (error) => {
            console.error("SERVER ERROR: ", error);
            throw error;
        });
        
    } catch(err){
        console.error(`Mongo DB connection failed!: `, err);
    }
})();