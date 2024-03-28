import  express,{ Request,Response,Express } from "express"

export const setupServer=(router_app:(app:Express)=>Express)=>{
    const app=express()
    app.use(express.json())
    router_app(app)
    return app
}
