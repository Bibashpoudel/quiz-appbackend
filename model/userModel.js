import mongoose  from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        requred:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    coin:{
        type:Number,
        default:0
    },
    level:{
        type:Number,
        default:0
    }
    ,
    isAdmin:{
        type:Boolean,
        require:true,
        default:false
    }
})

const userModel = mongoose.model("user", userSchema)

export default userModel