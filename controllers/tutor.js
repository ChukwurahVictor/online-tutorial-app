const mongoose = require('mongoose');

const User = require('../models/User');
const Tutor = require('../models/Tutor');
const Category = require('../models/Category');
const Subject = require('../models/Subject');

exports.registerSubject = (req, res, next) => {
   Subject.findById(req.params.subjectId)
   .then(result => {
      Tutor.findById(req.body.tutorId)
      .then(tutor => {
         tutor.subjects.push(result)
      })
      res.status(201).json({
         message: 'subject registered'
      })
   })
   .catch(err => {
      console.log(err)
      res.status(500).json({
         message: 'Tutor not found!',
         error: err
      })
   });
}

