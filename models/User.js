const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = require('./Subject');
const Lesson = require('./Lesson');

const userSchema = new Schema({
   name: {
      type: String
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   isAdmin: {
      type: Boolean,
      default: false
   },
   role: {
      type: String,
      enum: ['student', 'tutor'],
      default: 'student'
   },
   subjects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
   }],
   lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lesson'
   }],
}, {
   timestamps: true
});

module.exports = mongoose.model('User', userSchema)