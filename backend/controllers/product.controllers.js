import { Product } from '../models/product.model.js';
import mongoose from 'mongoose';

export const fetchAllProducts = (req,res) => {
    Product.find({})
    .then((result) => {
        res.json(result);
    })
    .catch(error => res.status(500).json({ success: false, message: "Internal Server Error" }));
}

export const fetchParticularProduct = (req,res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    Product.findById(id)
    .then((result) => {
        res.json(result);
    })
    .catch((error) => res.status(500).json({ success: false, message: "Internal Server Error" }));
}

export const createProduct = (req,res) => {
    const product = req.body;

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
    .catch(error => res.status(500).json({ success: false, message: "An Error occured in the saving logic!" }));
}

export const updateProduct = (req,res) => {
    const id = req.params.id;
    const updatedProduct = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    Product.findByIdAndUpdate(id, updatedProduct, {new: true})
    .then(() => {
        res.status(200).json({ success: true, message: "Successfuly updated the Product", data: updatedProduct})
    })
    .catch(error => res.status(500).json({ success: false, message: "Internal Server Error" }));
}

export const deleteProduct = (req,res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    Product.findByIdAndDelete(id)
    .then(() => {
        res.status(200).json({ success: true, message: "The Product has been deleted" });
    })
    .catch(error => res.status(404).json({ success: false, message: "The Product could not be found" }));
}