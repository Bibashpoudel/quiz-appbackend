import express from 'express'
import data from './data.js';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userrouter from './router/userRouter.js';
import config from './config.js';
import bodyParser from 'body-parser'
import quizRouter from './router/Quiz.js';



dotenv.config()

const mongodurl = config.MONGODB_URL
mongoose.connect(mongodurl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch( error=> console.log(error))

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use('/api/user', userrouter)
app.use('/api/quiz', quizRouter)

app.get('/', (req,res)=>{
    res.send("hello from server")
})


app.listen(9000, ()=>{
    console.log("http://localhost:9000");
})