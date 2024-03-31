import express, { application } from "express"
import { router_wrap } from "./product/product.router"
import { connectDB,disconnectDB } from "./utils/connectdb"
import cors from "cors"
const app=express()
const PORT=3000


require("dotenv").config()
app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(express.json())


app.get("/",(req,res)=>{  
    return res.json({msg:"Hello world"})
})

router_wrap(app)

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI_DEV)
        app.listen(PORT,()=>{console.log("Server Runningin PORT: ",PORT)})
    }catch(e){
        console.log(e)
    }
}
start()

export {app}