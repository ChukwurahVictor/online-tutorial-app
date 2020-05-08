const User = require('../models/User');
const Category = require('../models/Category');
const Subject = require('../models/Subject');

exports.createCategory = (req, res, next) => {
   const category = new Category({
      name: req.body.name
   })
   category
   .save()
   .then(result => {
      console.log(result);
      res.status(201).json({
         message: 'Created Category successfully!',
         createdCategory: {
            _id: result._id,
            name: result.name
         }
      })
   })
   .catch(err => {
      console.log(err);
      res.status(500).json({
         error: err
      })
   })
}

exports.getCategory = (req, res) => {
   Category.find()
   .then(result => {
      res.status(200).json({ 
         category: result 
      })
   })
   .catch(err => {
      res.status(500).json({
         error: err
      })
   })
}

exports.createSubject = (req, res, next) => {
   Category.findById(req.body.categoryId)
   .then(category => {
      res.send(category)
      // if (!category) {
      //   throw "Category not found!";
      // }
      // console.log('Hello!');
      // const subject = new Subject({
      //   _id: mongoose.Types.ObjectId(),
      //   name: req.body.name,
      //   category: req.body.categoryId
      // });
      // return subject.save();
    })
   .then(result => {
      console.log(result);
      res.status(201).json({
         message: 'Subject created successfully!'
      })
   })
   .catch(err => {
      console.log(err);
      res.status(500).json({
         error: err
      })
   })
}

exports.updateSubject = (req, res, next) => {
   const id = req.params.subjectId;
   const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
   }
   
   Subject.updateOne({_id: id}, { $set: updateOps})
   .exec()
   .then(result => {
      res.status(200).json({
         message: 'Subject Updated Successfully!'
      });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({error: err})
   });
}

exports.deleteSubject = (req, res, next) => {
   Subject.findByIdAndDelete(req.params.subjectId)
   .then(result => {
       console.log(result);
       res.status(200).json({
           message: "Subject deleted."
       })
   })
   .catch(err => {
       console.log(err)
       res.json({
           message: 'An error occured',
           error: err
       })
   })
}

exports.updateCategory = (req, res, next) => {
   const id = req.params.categoryId;
   const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
   }
   
   Subject.updateOne({_id: id}, { $set: updateOps})
   .exec()
   .then(result => {
      res.status(200).json({
         message: 'Category Updated Successfully!'
      });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({error: err})
   });
}

exports.deleteCategory = (req, res, next) => {
   Category.findByIdAndDelete(req.params.categoryId)
   .then(result => {
       console.log(result);
       res.status(200).json({
           message: "Category deleted."
       })
   })
   .catch(err => {
       console.log(err)
       res.json({
           message: 'An error occured',
           error: err
       })
   })
}