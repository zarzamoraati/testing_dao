import { Request,Response } from "express"
import { createProductService,getProductsService,updateProductService ,getOneProductService,deleteProductService} from "./product.service"
import { Product } from "../interfaces/product.interface"


const {_}=require("lodash")
 

const getProducts = async (req:Request,res:Response)=>{
    try{
        const result=await getProductsService()
        return res.status(200).json(result)
    }catch(e){
        return res.status(500).json(e)
    }
}
const getOneProduct=async(req:Request,res:Response)=>{
      //validate request 
      const id=req.params.id
      if (_.isEmpty(id)){
        const err=new Error("Bad request, params is missing or the format is not correct")
        return res.status(401).json(err)
    }else{
        try{
            const result=await getOneProductService(id)
            return res.status(200).json(result)
        
        }catch(e){
         return res.status(500).json(e)            
        }
    }
}

const createProduct = async(req:Request,res:Response)=>{
    try{
        // validating request
        const params = req.body
        if (_.isEmpty(params)){
           const err = new Error("The request has not an attribute body")
           return res.status(400).json(err)
        }else{
            const result= await createProductService(params)
            return res.status(201).json(result)
        }
    }catch(e){
        return res.status(400).json(e)
    }
}

const updateProduct = async (req:Request,res:Response) => { 
   // validate request  
    const id=req.params.id
    const payload=req.body
   if (_.isEmpty(id) || _.isEmpty(payload)){
        const err=new Error("Bas request, one element is missing")
        return res.status(400).json(err)
   }else{
        try{
            const response=await updateProductService(id,payload)
            return res.status(200).json(response)
        }catch(e){
            return res.status(500).json(e)
        }   
   }
}

const deleteProduct=async(req:Request,res:Response)=>{
     // valid request
     const id=req.params.id
        if(!(id)){
            const err=new Error("Bad request, field id is missing")
            return res.status(401).json(err)
        }else{
            try{
                const product=await deleteProductService(id)
                return res.status(200).json(product)
            }catch(e){
                return res.status(500).json(e)
            }
        }
}
export {getProducts,createProduct,updateProduct,getOneProduct,deleteProduct}