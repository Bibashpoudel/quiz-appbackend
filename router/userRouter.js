import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../model/userModel.js'
import { getToken, isAdmin, isAuth } from '../utils.js';

const router = express.Router()

router.post('/signin', expressAsyncHandler(async(req, res)=>{
    
    const signinUser = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });
    if(signinUser){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id:signinUser.id,
                name:signinUser.name,
                email:signinUser.email,
                coin:signinUser.coin,
                level:signinUser.level,
                isAdmin:signinUser.isAdmin,
                token:getToken(signinUser),
            })

        }
        
    }
    else{
        res.status(401).send({ message: 'Invalid email or password' });
    }
}))


router.get('/createadmin', expressAsyncHandler(async(req,res)=>{
    try {
        const user = new User({
            name:'bibash',
            email:'pdlbibash77@gmail.com',
            password:"1234",
            isAdmin:true
        })
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        res.send({msg: error.message})
    }

    
}))
router.post('/register', expressAsyncHandler(async(req,res)=>{
    
    try {
        const olduser = await User.findOne({
            email:req.body.email,
        })
        
        if(!olduser){
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password:  bcrypt.hashSync(req.body.password, 8),
                coin:100,
                level:0,
            }) 
            const newUser = await user.save()
            res.send({
                _id:newUser.id,
                name:newUser.name,
                email:newUser.email,
                coin:newUser.coin,
                level:newUser.level,
                isAdmin:newUser.isAdmin,
                token:getToken(newUser)
            })
        }
        else{
            res.status(401).send("user already exist")
        }
        
    } catch (error) {
        res.send({"error": error.message})
        
    }
}))
router.get('/:id', expressAsyncHandler(async(req, res) =>{
    const userid = req.params.id;
    const user = await User.findById(userid);
    if(user){
        res.send(user)
    }
    else{
        res.status(404).send({message:" user not exist"})
    }
}))
router.put('/update', expressAsyncHandler(async(req,res)=>{
    
    try {
        const users = req.parms.id;
        const user = await User.findById(users)
        
        if(user){
                user.name= req.body.name;
                user.email= req.body.email;
                user.password= req.body.password;
                user.coin= req.body.coin;
                user.level = req.body.level;
            
            const updateuser = await user.save()
            if(updateuser){
                res.status(200).send("completed")
            }
        }
        else{
            res.status(401).send("user already exist")
        }
        
    } catch (error) {
        res.send({"error": error.message})
        
    }
}))
router.put(
    '/levcoin',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.coin = req.body.coin || user.coin;
        user.level = req.body.level || user.level;
        // user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.send({ 
            _id:updatedUser.id,
            name:updatedUser.name,
            email:updatedUser.email,
            coin:updatedUser.coin,
            level:updatedUser.level,
            isAdmin:updatedUser.isAdmin,
            token:getToken(updatedUser)
        });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );
router.put(
    '/coin',
    isAuth,
    expressAsyncHandler
    (async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.coin = req.body.coin || user.coin;
        // user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.send({
            _id:updatedUser.id,
            name:updatedUser.name,
            email:updatedUser.email,
            coin:updatedUser.coin,
            level:updatedUser.level,
            isAdmin:updatedUser.isAdmin,
            token:getToken(updatedUser)
        });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );
export default router;