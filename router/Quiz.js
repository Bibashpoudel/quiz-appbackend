import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Quiz from '../model/quizModel.js'
import { isAdmin, isAuth } from '../utils.js';

const quizRouter = express.Router()



quizRouter.get('/question', expressAsyncHandler(async(req, res) =>{

    const level = req.query.level || '';
    const type = req.query.type || '';


    const levelFilter = level ? { level } : {};

    const typeFilter = type ? { type } : {};


    const count = await Quiz.count({
        ...levelFilter,
        ...typeFilter
    })
    const question = await Quiz.find({
        ...levelFilter,
        ...typeFilter
    })


    res.send(question);
}))
quizRouter.get('/level', expressAsyncHandler(async(req, res)=>{
    const level = await Quiz.find().distinct('level')
    res.send(level)
}))
quizRouter.get('/type', expressAsyncHandler(async(req, res)=>{
    const type = await Quiz.find().distinct('type')
    res.send(type)
}))

// quizRouter.get('/creatQuiz', expressAsyncHandler(async(req,res)=>{
//     try {
//         const quiz = new Quiz({
//             question:"HTML is what type of language first 10 level1",
//             option1:"Markup Language",
//             option2:"Scripting Language",
//             option3:'Programming Language',
//             option4:'Network Protocol',
//             answer:'Markup Language',
//             level: 2,
//             type:"technology "
//         })
//         const newquiz = await quiz.save()
//         res.send(newquiz)
//     } catch (error) {
//         res.send({msg: error.message})
//     }

    
// }))
quizRouter.post('/add_question',
    isAdmin,
    isAuth,

    expressAsyncHandler(async(req, res)=>{
    const oldQuestion = await Quiz.findOne({
        question:req.body.question
    })
   if(!oldQuestion){
    try {
        const quiz = new Quiz({
            question:req.body.question,
            option1:req.body.option1,
            option2:req.body.option2,
            option3:req.body.option3,
            option4:req.body.option4,
            answer:req.body.answer,
            level:req.body.level,
            type:req.body.type
        })
        const newQuiz = quiz.save()

        res.status(200).send(newQuiz)
    } catch (error) {
        res.send(error)
        
    }
   }
   else{
       res.send(401).send("question already exist")
   }
}));
// productRouter.post(
//     '/:id/score',
//     isAuth,
//     expressAsyncHandler(async (req, res) => {
//       const question = req.params.id;
//       const product = await Quiz.findById(productId);
//       if (product) {
//         if (product.reviews.find((x) => x.name === req.user.name)) {
//           return res
//             .status(400)
//             .send({ message: 'You already submitted a review' });
//         }
//         const review = {
//           name: req.user.name,
//           rating: Number(req.body.rating),
//           comment: req.body.comment,
//         };
//         product.reviews.push(review);
//         product.numReviews = product.reviews.length;
//         product.rating =
//           product.reviews.reduce((a, c) => c.rating + a, 0) /
//           product.reviews.length;
//         const updatedProduct = await product.save();
//         res.status(201).send({
//           message: 'Review Created',
//           review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
//         });
//       } else {
//         res.status(404).send({ message: 'Product Not Found' });
//       }
//     })
//   );

export default quizRouter;