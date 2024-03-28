import express,{application,Express} from "express";
import { getProducts,createProduct,updateProduct,getOneProduct,deleteProduct} from "./product.controller";

const productRouter=express.Router()

productRouter.route("/products").get(getProducts).post(createProduct)

productRouter.route("/products/:id").get(getOneProduct).patch(updateProduct).delete(deleteProduct)

export const router_wrap=(app:Express)=>app.use("/",productRouter)

