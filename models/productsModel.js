import mongoose from "mongoose";

const {Schema, model}= mongoose;

const productSchema = new Schema(
    {
        name:{
            type:String,
            require:true,
        },
        description:{
            type:String,
            require:true,
        },
        price:{
            type:String,
            require:true,
        },
        file:{
            type:String,
        },
    },
    {
        collection: "Products",
        timestamps:true,
    },
);

const Product = model("Product", productSchema);
export default Product;