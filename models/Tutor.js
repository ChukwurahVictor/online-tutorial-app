const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
   name: {
      type: String,
      required: true
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
   subjects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
   }]
}, {
   timestamps: true
});

module.exports = mongoose.model('Tutor', tutorSchema)