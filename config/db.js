import mongoose from 'mongoose'


const DBConnection= async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/Node_cafe",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}
export default DBConnection