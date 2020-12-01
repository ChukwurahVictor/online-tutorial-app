const User = require('../models/User');
const Subject = require('../models/Subject');
const Lesson = require('../models/Lesson');
const { response } = require('express');
const { find } = require('../models/Subject');

exports.subjectTutors = async(req, res, next) => {
   try {
      const { subjectId } = req.params;
      const subject = await Subject.findById(subjectId).populate('tutors')
      if(!subject) {
         return res.status(423).send({
            status: 'failed',
            message: 'Subject not found!'
         })
      }
      return res.status(200).send({
         status: 'success',
         subject
      })
   } catch (err) {
      console.log(err)
   }
}

exports.bookLesson = async(user, req, res, next) => {
   try {
      const lesson = req.body;
      const tutor = await User.findById(lesson.tutor);
      if(!tutor || tutor.role != 'tutor') {
         return res.status(400).send({
            status: 'failed',
            message: 'Tutor does not exist'
         })
      }
      const findLesson = await Lesson.find({ title: lesson.title });
      if(findLesson) {
         return res.status(400).send({
            status: 'failed',
            message: 'Lesson title already exist'
         })
      }
      const newLesson = new Lesson(lesson);
      newLesson.student.push(user);
      user.lessons.push(newLesson);
      await user.save();
      await newLesson.save();
      res.send({
         status: 'failed',
         message: 'Lesson created successfully',
         newLesson
      })
   } catch (err) {
      console.log(err);
   }
}


