import mongoose,{Schema} from "mongoose";

const product=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

const model= mongoose.model("Product",product)

export {model}


