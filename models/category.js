import mongoose from "mongoose";

const {Schema, model}= mongoose;

const categorySchema= new Schema(
    {
        name:{
            type:String,
            require: true,
        },
        slug:{
            type:String,
        },
        product_id:{
            type: Schema.Types.ObjectId,
            ref:"Product",
        }
    },
    {
        collection: "Category",
    },
);
categorySchema.pre(["find", "findOne", "save", "create"], function(){
    this.populate(["product_id"]);
})
const Category = model("Category", categorySchema);
export default Category