const User = require('../models/User');
const Tutor = require('../models/Tutor');
const Lesson = require('../models/Lesson');

exports.log_of_tutors = (req, res, next) => {
   Tutor.find()
   .exec()
   .then(docs => {
      console.log(docs),
      res.status(200).json({
         count: docs.length,
         tutors: docs.map(doc => {
            return {
               id: doc._id,
               name: doc.name,
               email: doc.email
            }
         })
      })
   })
   .catch(err => {
      res.status(500).json({
         error: err
      })
   })
}

exports.createLesson = (req, res, next) => {
   const lesson = new Lesson({
      title: req.body.title
   })
   lesson
   .save()
   .then(result => {
      console.log(result);
      res.status(201).json({
         status: true,
         message: "Created lesson success"
      })
   })
   .catch(err => {
      console.log(err);
      res.status(500).json({
         error: err
      })
   })
}

exports.bookLesson = (req, res, next) => {
   Lesson.findById(req.params.lessonId)
   .then(lesson => {
      if (!lesson) {
         return res.json({
            message: "Lesson not found"
         })
      }
      res.send(lesson)
   })
   .catch(err => {
      console.log(err);
      res.status(500).json({
         error: err
      })
   })
}