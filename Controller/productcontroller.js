import Product from "../models/productsModel.js";
import dotenv from "dotenv";
import { Model } from "mongoose";

dotenv.config();
const PORT =process.env.PORT;

// get all product
export function getAll(req, res, next) {
    Product.find({})
        .then(response => {
            res.status(200).send({ success: true, data:response });
        })
        .catch(err => {
            return next(err);
        });
};

// get product by ID
export function getById(req, res, next) {
    let { id } = req.params;
    Product.findOne({ _id: id }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({
            success: true,
            response,
            imagePath: `http://localhost:${PORT}/${response.file}`,
        });
    });
};

//add product

export function addProduct(req, res) {
    console.log(req.body)
    
    let doc = new Product(req.body);
    doc.save()
        .then(response => {
            res.status(200).send({ success: true, response });
        })
        .catch(err => {
            res.status(500).json({
                message: `ERROR ${err}`,
                success: false,
            });
        });
};

//update product by ID

export function updateProductById(req, res, next) {
    let { path } = req.file || "";
    let { name, description, price} = req.body;
    let body = { name: name, description: description, price:price, file: path };
    let { id } = req.params;
    Product.findOneAndUpdate(
        { _id: id },
        {
            $set: body,
        },
        (err, response) => {
            if (err)
                return res.status(500).json({
                    message: `ERROR ${err}`,
                    success: false,
                });
            if (req.file) fs.unlinkSync(response.file);
            res.status(200).send({ success: true, response });
        }
    );
};

//delete product by ID

export function deleteProductById(req, res, next) {
    let { id } = req.params;
    Product.findByIdAndDelete(id, (err, response) => {
        if (err) return next(err);
        fs.unlinkSync(response.file);
        res.status(200).send({ success: true, response });
    });
};

const ProductController = {
    getAll,
    deleteProductById,
    addProduct,
    getById,
    updateProductById,
};
export default ProductController;