const mongoose = require('mongoose');

const User = require('../models/User');
const Category = require('../models/Category');
const Subject = require('../models/Subject');

//Register subject as a tutor
exports.registerSubject = async(user, req, res, next) => {
   try {
      const subject = await Subject.findById(req.body.subject)
      if(!subject) {
         return res.status(400).send({
            status: "failed",
            message: 'Subject not found!'
         })
      }
      user.subjects.push(subject);
      subject.tutors.push(user);
      await user.save();
      await subject.save();
      res.status(200).send({
         status: 'success',
         message: `You have registered for ${subject.name} as a tutor successfully`
      })
   } catch (err) {
      console.log(err)
   }
}

//Get all subjects registered for
exports.registeredSubjects = async(user, req, res, next) => {
   try {
      const subject = user.subjects;
      const subjects = await Subject.findById(subject);
      if(!subjects) {
         return res.status(400).send({
            status: 'failed',
            message: 'No subject registered'
         })
      }
      res.send({
         status: 'success',
         subjects
      })
   } catch (err) {
      console.log(err)
   }
}

//Update a registered subject
exports.updateRegisteredSubject = async(user, req, res, next) => {

}

//Delete a registered subject
exports.deleteRegisteredSubject = async(user, req, res, next) => {
   try {
      const {id} = req.body;
      const subjects = user.subjects.filter(x => {
         return x.id = id;
      })
      user.subjects = subjects;
      await user.save();
      res.send({
         status: 'success',
         message: 'Subject deleted',
         subjects
      })
   } catch (err) {
      console.log(err);
   }
}