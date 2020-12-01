const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
   },
   tutors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }]
}, {
   timestamps: true
})

module.exports = mongoose.model('Subject', subjectSchema);