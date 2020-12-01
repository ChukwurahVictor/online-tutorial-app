const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.isAuthenticated = async function(req, res, next) {
   const token = req.header('auth-token');
   console.log(token)
   if (!token) {
      return res.status(401).send('Access Denied - No token provided!')
   }
   try {
      const decoded = await jwt.verify(token, process.env.JWT_KEY)
      // if(decoded.exp <= Date.now()){
      //   return res.status(401).send({
      //     status: 'failed',
      //     message: 'Access token expired'
      //   })
      // }
      const user = await User.findById(decoded._id)
      console.log(user)
      if(!user){
        return res.status(401).send('User not recognized')
      }
      next();
   } catch(error) {
      res.status(400).send('Invalid token!')
   }
}

module.exports.isAuthenticatedAndPassUser = async function(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
     return res.status(401).send('Access Denied - No token provided!')
  }
  try {
     const decoded = await jwt.verify(token, process.env.JWT_KEY)
     // if(decoded.exp <= Date.now()){
     //   return res.status(401).send({
     //     status: 'failed',
     //     message: 'Access token expired'
     //   })
     // }
     const user = await User.findById(decoded._id)
     console.log(user)
     if(!user){
       return res.status(401).send('User not recognized')
     }
     next(user);
  } catch(error) {
     res.status(400).send('Invalid token!')
  }
}

exports.isTutor = async(user, req, res, next) => {
  if(user.role != 'tutor'){
    return res.status(401).send({
      status: 'failed',
      message: 'Unauthorized - you are not a tutor'
    })
  }
  next();
}

exports.isAdmin = async(user, req, res, next) => {
  if(user.isAdmin != true) {
    return res.status(401).send({
      status: 'failed',
      message: 'Unauthorized - you are not an admin'
    })
  }
  next();
}

 