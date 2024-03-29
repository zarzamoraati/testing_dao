import { Payload, Product } from "../interfaces/product.interface";
import {model} from "./product.schema";
import { FilterQuery, UpdateQuery } from 'mongoose';

// GET ALL
const getProductsFromDb=async()=>{
   const data=await model.find({})
   return data 
}
// POST
const saveProductToDb=async(product:Product)=>{
    // saving product in DB
    const response=await model.create(product)
    return response
}
// GET ONE 
const getOneProductFromDb=async(id:string)=>{
    
    const product=await model.findById(id)
    return product
}
// PATCH
const updateProductToDb=async(id:string,payload:Product)=>{
    const update_product = await model.findOneAndUpdate(
        { _id: id },
        payload as UpdateQuery<Product>, // Especificar el tipo como UpdateQuery<Product>
        { new: true }
    );

    return update_product
   
}

// DELETE

const deleteProductFromDb=async(id:string)=>{
    const result= await model.findOneAndDelete({_id:id} as FilterQuery<object>)
    return result
}

export {saveProductToDb,getProductsFromDb,updateProductToDb,getOneProductFromDb,deleteProductFromDb}
