const mongoose = require('mongoose');
const Subject = require('./Subject');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
   name: {
      type: String,
      required: true
   },
   subjects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
   }]
})

categorySchema.pre('remove', function(next) {
   Subject.deleteMany({ category: this.id }).exec();
   next();
})

module.exports = mongoose.model('Category', categorySchema);