import express from 'express'
const app = express();
app.use(express.json());

import dotenv from 'dotenv'
dotenv.config();
import {info} from './utils/logger.js'

import Database, {Product} from './models/product-model.js'


app.get('/', (req,res) => {
    res.send('Hello Tarv!');
})

app.get('/api/products', (req,res) => {
    Product.find({})
    .then((result) => {
        res.json(result);
    })
})

app.post('/api/products', (req,res) => {
    const product = req.body;
    info(product);

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'You have undefined properties in the body!', data: product.content });
    }

    const newProduct = new Product({
        name: product.name,
        price: product.price,
        image: product.image
    })

    newProduct.save()
    .then(() => {
        res.status(201).json({ success: true, data: newProduct });
    })
    .catch(error => res.status(500).json({ success: false, message: "Errors!"}));
})

app.listen(process.env.PORT, () => {
    Database();
    info('Server started on https://localhost:5000');
})