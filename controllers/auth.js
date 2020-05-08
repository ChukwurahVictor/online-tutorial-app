const User = require("../models/User");
const Tutor = require("../models/Tutor");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.tutor_signUp = (req, res, next) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   if(!email || !password) {
      res.status(400).send({
         status: false,
         message: "All fields required"
      })
      return;
   }
   Tutor.findOne({ email })
   .then(user => {
      if(user) {
         return res.status(423).send({
            status: false,
            message: "This email already exists"
         })
      }
   })
   bcrypt
   .hash(password, 12)
   .then(password => {
      let user = new Tutor({
         name,
         email,
         password
      });
      return user.save();
   })
   .then(() => {
      res.status(200).send({
         status: true,
         message: "Tutor registered successfully"
      })
   })
   .catch(error => console.log(error));
}

exports.tutor_logIn = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   Tutor.findOne({ email })
   .then(user => {
      if (!user) {
         return res.status(404).send("Tutor not found, please provide valid credentials");
      }
      bcrypt.compare(password, user.password)
      .then(valid => {
         if (!valid) {
            return res.status(403).send(
               "Incorrect username or password, please review details and try again"
            );
         }
         const token = jwt.sign({
               email: user.email,
               _id: user._id
         },
         "somesecretkey",
         {
            expiresIn: "1hr"
         });
         res.status(200).send({
            _id: user._id,
            email: user.email,
            token
         });
      });
   })
   .catch(err => 
      console.log(err)
   );
}

exports.signUp = (req, res, next) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   if(!email || !password) {
      res.status(400).send({
         status: false,
         message: "All fields required"
      })
      return;
   }
   User.findOne({ email })
   .then(user => {
      if(user) {
         return res.status(423).send({
            status: false,
            message: "This email already exists"
         })
      }
   })
   bcrypt
   .hash(password, 12)
   .then(password => {
      let user = new User({
         email,
         password
      });
      return user.save();
   })
   .then(() => {
      res.status(200).send({
         status: true,
         message: "User registered successfully"
      })
   })
   .catch(error => console.log(error));
}

exports.logIn = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   User.findOne({ email })
   .then(user => {
      if (!user) {
         return res.status(404).send("User not found, please provide valid credentials");
      }
      bcrypt.compare(password, user.password)
      .then(valid => {
         if (!valid) {
            return res.status(403).send(
               "Incorrect username or password, please review details and try again"
            );
         }
         const token = jwt.sign({
               email: user.email,
               _id: user._id
         },
         "somesecretkey",
         {
            expiresIn: "1hr"
         });
         res.status(200).send({
            _id: user._id,
            email: user.email,
            token
         });
      });
   })
   .catch(err => 
      console.log(err)
   );
}