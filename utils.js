import jwt from 'jsonwebtoken'
import config from './config.js'

const getToken = (user) =>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email:user.email,
        level:user.level,
        coin:user.coin,
        isAdmin:user.isAdmin,
        
    }, config.JWT_SECRET,{
        expiresIn: '24h'
    })
}
const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); 
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'BIBASH!@#$%^123',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };
const isAdmin = (req, res, next) =>{
    if (req.user = req.user.isAdmin){
        return next();
    }
    return res.status(401).send({msg:"not valid "})
}
export{
    getToken,
    isAdmin,
    isAuth,

}