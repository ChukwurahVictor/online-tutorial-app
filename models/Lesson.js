const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }
}, {
   timestamps: true
})

module.exports = mongoose.model('Lesson', lessonSchema);