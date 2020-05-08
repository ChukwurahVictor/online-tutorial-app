const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
   subjects: {
      type: Array
   },
   lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor'
   }],
}, {
   timestamps: true
});

module.exports = mongoose.model('User', userSchema)