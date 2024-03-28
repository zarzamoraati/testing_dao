import mongoose from "mongoose"

const connectDB =async (uri:any)=>{
    try{
        mongoose.connect(uri)
        console.log("Connect to DB succesfully...")
    }catch(e){
        console.log("Error connecting to DB",e)
    }
}

const disconnectDB=async()=>{ 
    try{
        await mongoose.disconnect()
        console.log("Connection with DB closed")
    }catch(e){
        console.log("Error to close the connection with mongoDB",e)
    }
}

export {connectDB,disconnectDB}