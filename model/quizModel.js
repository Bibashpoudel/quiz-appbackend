import mongoose  from 'mongoose';

const scoreSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      score: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );


const questionSchema = new mongoose.Schema({
    question:{
        type:String, 
        requred:true,
    },
    option1:{
        type:String,
        required:true,
    },
    option2:{
        type:String,
        required:true,
    },
    option3:{
        type:String,
        required:true,
    },
    option4:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        require:true,
        default:false
    },
    type:{
        type:String,
        required:false
    },
    score:[scoreSchema]
},
{
    timestamps: true,
  }
)

const questionModel = mongoose.model("question", questionSchema)

export default questionModel