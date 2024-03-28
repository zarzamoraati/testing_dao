import { createProduct } from "./product.controller";
import { Product,Payload } from "../interfaces/product.interface";
import { saveProductToDb,getProductsFromDb ,updateProductToDb,getOneProductFromDb,deleteProductFromDb} from "./product.dao";

const getProductsService=async()=>{
    try{
        return await getProductsFromDb()        
    }catch(e){
        console.log(e)
        throw e
    }
}

const getOneProductService=async(id)=>{
    // validate form 
    if (typeof id != "string"){
        const err=new Error("Bad request, the format is not valid (only string)")
        throw (err)
    }else{
        try{
            const product= await getOneProductFromDb(id)
            if (!(product)){
                const err=new Error("Product not found in DB")
                throw(err)
            }else{
                return product 
            }
        }catch(e){
            throw(e)
        }
    }
}

const createProductService=async(product:Product)=>{
    try{
        // Validate shape input
        return await saveProductToDb(product)
    }catch(e){
        throw e
    }
}

const updateProductService=async(id,payload)=>{
    // validate shape 
    if ((typeof id != "string" || !("_id" in payload))){
        const err=new Error("Bad Request, field _id is missing")
        throw err
    }else{
        try{
            const paramsProduct=payload as Product
            return await updateProductToDb(id, paramsProduct)            
        }catch(e){
            console.log(e)
            throw e
        }        
    }
    
}

const deleteProductService=async(id)=>{
    // validate id
    if (typeof id != "string"){
        const err=new Error("Bad request, id is not a valid format")
        throw err
    }else{
        try{
            const result=await deleteProductFromDb(id)
            if(!(result)){
                throw new Error("Product wasn't found in DB")
            }else{
                return result
            }
        }catch(e){
            throw e
        }
    }
}


export {createProductService,getProductsService,updateProductService,getOneProductService,deleteProductService}