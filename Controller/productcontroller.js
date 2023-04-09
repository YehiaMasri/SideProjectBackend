import Product from "../models/productsModel.js";
import dotenv from "dotenv";
import fs from "fs";
import { Model, set } from "mongoose";
import { response } from "express";

dotenv.config();
const PORT = process.env.PORT;

// get all product
export function getAll(req, res, next) {
  Product.find({})
    .then((response) => {
      res.status(200).send({ success: true, data: response });
    })
    .catch((err) => {
      return next(err);
    });
}

// get product by ID
export function getById(req, res, next) {
  let { id } = req.params;
  Product.findOne({ _id: id })
    .exec()
    .then((response) => {
      res.status(200).send({
        success: true,
        response,
        imagePath: `http://localhost:${PORT}/${response.file}`,
      });
    })
    .catch((err) => {
      return next(err);
    });
}

//add product

export function addProduct(req, res) {
  console.log(req.body);
  let { path } = req.file || "";
  let { name, description, price } = req.body;
  let body = { name: name, description: description, price: price, file: path };
  let doc = new Product(body);
  console.log(doc);
  doc
    .save()
    .then((response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      res.status(500).json({
        message: `ERROR ${err}`,
        success: false,
      });
    });
}

//update product by ID

export function updateProductById(req, res, next) {
  let { path } = req.file || "";
  let { name, description, price } = req.body;
  let body = { name: name, description: description, price: price, file: path };
  let { id } = req.params;

  Product.findOneAndUpdate(
    { _id: id },
    { $set: body },
    console.log(req.body)
  )
    .then((response) => {
      if (req.file) fs.unlinkSync(response.file);
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      res.status(500).json({
        message: `ERROR ${err}`,
        success: false,
      });
    });
}

//delete product by ID

export function deleteProductById(req, res, next) {
  let { id } = req.params;

  Product.findByIdAndDelete(id)
    .then((response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      return next(err);
    });
}

const ProductController = {
  getAll,
  deleteProductById,
  addProduct,
  getById,
  updateProductById,
};
export default ProductController;
