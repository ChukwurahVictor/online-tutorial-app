const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async(req, res, next) => {
   try {
      const name = req.body.name;
      const email = req.body.email;
      let password = req.body.password;
      const role = req.body.role;
      if(!name || !email || !password) {
         return res.status(400).send({
            status: 'failed',
            message: "All fields required"
         })
      }
      const findUser = await User.findOne({ email });
      if(findUser) {
         return res.status(423).send({
            status: 'failed',
            message: "This email already exists"
         })
      }
      const newPassword = await bcrypt.hash(password, 12)
      password = newPassword
      const user = new User({
         name,
         email,
         password,
         role
      });
      const token = jwt.sign({
         email: user.email,
         _id: user._id
      },
      process.env.JWT_KEY,
      {
         expiresIn: "24hr"
      });
      const newUser = await user.save();
      res.status(201).send({
         status: 'Success',
         newUser,
         token
      })
   } catch (err) {
      console.log(err)
   }
}

exports.logIn = async(req, res, next) => {
   try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ email })
      if(!user) {
         return res.status(404).send("User not found, please provide valid credentials");
      }
      const validPassword = await bcrypt.compare(password, user.password)
      if(!validPassword) {
         return res.status(403).send(
            "Incorrect username or password, please review details and try again"
         );
      }
      const token = jwt.sign({
            email: user.email,
            _id: user._id
      },
      process.env.JWT_KEY,
      {
         expiresIn: "24hr"
      });
      res.status(200).send({
         _id: user._id,
         email: user.email,
         token
      });
   } catch (err) {
      console.log(err)
   }
}