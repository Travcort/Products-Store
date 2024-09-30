import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {info,errors} from '../utils/logger.js';


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

const Database = () => {
    mongoose.connect(process.env.Mongo_URI)
    .then(() => {
        info("Successfully Connected to MongoDB on Atlas!");
    })
    .catch(error => {
        errors("Could not connect to the Database!");
        errors(`Error: ${error.message}`);
        process.exit(1); 
    });
}


export default Database;
export {Product};
