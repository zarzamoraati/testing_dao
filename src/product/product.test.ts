import { connectDB, disconnectDB } from "../utils/connectdb"
const request=require("supertest")
const {_}=require("lodash")
import { setupServer} from "../utils/serverTest"
import { router_wrap } from "./product.router"
import { saveProductToDb } from "./product.dao"
import { Product } from "../interfaces/product.interface"
import { model } from "./product.schema"


require("dotenv").config()

const {describe,it,expect,beforeAll,afterAll,}=require("@jest/globals")
const app=setupServer(router_wrap)

beforeAll(async()=>{
    try{
       const productsArray=[
        {name:"Dummy_1",price:12},
        {name:"Dummy_2",price:52},
        {name:"Dummy_3",price:22}]
    
    await connectDB(process.env.MONGO_URI_TEST)
    for(const product of productsArray){
        await saveProductToDb(product)
    }
    }catch(e){
        console.log("Error ",e)
       throw e 
    }
})

describe('product API integration tests', () => {
    let product;

    it('GET /products - should fetch products',  async () => {
        return await request(app).get("/products")
        .then(res=>{
            expect(res.body).toBeDefined()
            expect(_.isArray(res.body)).toBeTruthy()
            expect(res.body.length).toEqual(3)
            expect(res.statusCode).toEqual(200)
        })
    })

    it("POST / should add a new product in the collection",async()=>{
        const new_product={
            name:"Milgdred",
            price:12
        }
        
        const res= await request(app).post("/products").send(new_product)
        
        expect(res.body.data).toBeDefined()
        expect(res.body.data.name).toEqual(new_product.name)
        expect(res.body.product).toBeDefined()
        expect(res.body.product.price).toEqual(new_product.price)
        expect(res.statusCode).toEqual(201)
        product=res.body.data;
    })

    it("GET ONE / should return a product from DB",async ()=>{
        const res=await request(app).get(`/products/${product._id}`)
        expect(res.body).toBeDefined()
        expect(res.statusCode).toEqual(200)
        expect(_.isObject(res.body)).toBeTruthy()
        expect(res.body.name).toEqual(product.name)
    })

    it("PATCH / should update the field name ",async()=>{
        
        // updating one field
        let new_product=product
        new_product.name="FERNALGA"

        const res=await request(app).patch(`/products/${product._id}`).send(new_product)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toEqual(new_product.name)
        expect(res.body.price).toBeDefined()
        expect(res.body.price).toEqual(product.price)
    })
    
    it("DELETE / should delete a document from the collection",async()=>{
        const res= await request(app).delete(`/products/${product._id}`)
        expect(res.body).toBeDefined()
        expect(res.body.name).toEqual(product.name)
        expect(res.statusCode).toBe(200)
    
    })
})

afterAll(async()=>{
    //await model.deleteMany()
    await model.deleteMany()
    await disconnectDB()
})

