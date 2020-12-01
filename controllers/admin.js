const User = require('../models/User');
const Category = require('../models/Category');
const Lesson = require('../models/Lesson');
const Subject = require('../models/Subject');
const { compareSync } = require('bcryptjs');

exports.createCategory = async(req, res, next) => {
   try {
      const category = new Category({
         name: req.body.name
      })
      const findCategory = await Category.findOne({ name: req.body.name });
      if(findCategory) {
         return res.status(423).send({
            status: 'failed',
            message: 'Category already exists!'
         })
      }
      const newCategory = await category.save();
      res.status(201).json({
         message: 'Created Category successfully!',
         newCategory
      })
   } catch (err) {
      console.log(err);
   }
}

exports.getAllCategories = async(req, res) => {
   try {
      const category = await Category.find()
      res.status(200).json({
         category
      })
   } catch (err) {
      console.log(err)
   }
}

exports.getCategory = async(req, res) => {
   try {
      const {categoryId} = req.params;
      const category = await Category.findById(categoryId);
      if(!category) {
         return res.status(400).send({
            status: 'failed',
            message: 'Category not found!'
         })
      }
      res.status(200).json({
         category
      })
   } catch (err) {
      console.log(err)
   }
}

exports.updateCategory = async(req, res, next) => {
   try {
      const {categoryId} = req.params;
      const updateCategory = req.body;
      const newCategory = await Category.findByIdAndUpdate(categoryId, updateCategory);
      if(!newCategory) {
         return res.status(400).send({
            status: 'failed',
            message: 'Error updating category'
         })
      }
      res.send({
         status: 'success',
         newCategory
      })
   } catch (err) {
      console.log(err);
   }
}

exports.deleteCategory = async(req, res, next) => {
   try {
      const {categoryId} = req.params;
      const category = await Category.findByIdAndDelete(categoryId);
      if(!category) {
         return res.status(400).send({
            status: 'failed',
            message: 'Category with specified id does not exist!'
         })
      }
      res.send({
         status: 'success',
         message: 'Category deleted successfully'
      })
   } catch (err) {
      console.log(err);
   }
}


exports.createSubject = async(req, res, next) => {
   try {
      const category = await Category.findById(req.body.category);
      if(!category) {
         return res.status(400).send({
            status: 'failed',
            message: 'Category with specified id not found'
         })
      }
      const subject = new Subject({ name: req.body.name });
      const findSubject = await Subject.findOne({name: req.body.name});
      if(findSubject){
         return res.status(400).send({
            status: failed,
            message: 'Subject already exist'
         })
      }
      const newSubject = await subject.save();
      res.status(201).send({
         status: 'success',
         newSubject
      })
      category.subjects.push(subject);
      await category.save();
   } catch (err) {
      console.log(err)
   }
}

exports.getAllSubjects = async(req, res, next) => {
   try {
      const subjects = await Subject.find()
      res.send({
         status: 'success',
         subjects
      })
   } catch (err) {
      console.log(err)
   }
}

exports.getSubject = async(req, res, next) => {
   try {
      const { subjectId } = req.params;
      const subject = await Subject.findById(subjectId).populate('category')
      if(!subject) {
         return res.status(400).send({
            status: 'failed',
            message: 'Subject not found'
         })
      }
      res.send({
         status: 'success',
         subject
      })
   } catch (err) {
      console.log(err)
   }
}

exports.updateSubject = async(req, res, next) => {
   try {
      const {subjectId} = req.params;
      const updatedSubject = await Subject.findByIdAndUpdate(subjectId, req.body);
      if(!updatedSubject) {
         return res.status(400).send({
            status: 'failed',
            message: 'Error updating subject'
         })
      }
      res.send({
         status: 'success',
         updatedSubject
      })
   } catch (err) {
      console.log(err)
   }
}

exports.deleteSubject = async(req, res, next) => {
   try {
      const deleteSubject = await Subject.findByIdAndDelete(req.params.subjectId)
      if(!deleteSubject) {
         return res.status(400).send({
            status: 'failed',
            message: 'Error deleting subject'
         })
      }
      res.send({
         status: 'success',
         message: 'Deleted subject successfully'
      })
   } catch (err) {
      console.log(err)
   }
}


exports.fetchAllTutors = async(req, res, next) => {
   try {
      const tutors = await User.find({role: 'tutor'}).select('email name role isAdmin')
      res.send({
         status: 'success',
         tutors
      })
   } catch (err) {
      console.log(err)
   }
}

exports.getTutor = async(req, res, next) => {
   try {
      const {tutorId} = req.params;
      const tutor = await User.findById(tutorId);
      if(!tutor) {
         return res.status(400).send({
            status: 'failed',
            message: 'User with the specified id does not exist'
         })
      }
      if(tutor.role != 'tutor') {
         return res.status(400).send({
            status: 'failed',
            message: 'User not a tutor'
         })
      }
      res.send({
         status: 'success',
         tutor
      })
   } catch (err) {
      console.log(err);
   }
}

exports.deactivateTutor = async(req, res, next) => {
   try {
      const {tutorId} = req.params;
      const tutor = await User.findById(tutorId);
      if(!tutor) {
         return res.status(400).send({
            status: 'failed',
            message: 'User with the specified id does not exist'
         })
      }
      if(tutor.role != 'tutor') {
         return res.status(400).send({
            status: 'failed',
            message: 'User not a tutor'
         })
      }
     const deactivateTutor = await User.deleteOne(tutorId);
     res.send({
        status: 'failed',
        message: 'Tutor deactivated'
     }) 
   } catch (err) {
      console.log(err);
   }
}

exports.getAllLessons = async(req, res, next) => {
   try {
      const lessons = await Lesson.find();
      res.send({
         status: 'success',
         lessons
      })
   } catch (err) {
      console.log(err);
   }
}

exports.getLesson = async(req, res, next) => {
   try {
      const { lessonId } = req.params;
      const lesson = await Lesson.findById(lessonId);
      if(!lesson) {
         return res.status(400).send({
            status: 'failed',
            message: 'Lesson not found'
         })
      }
      res.send({
         status: 'success',
         lesson
      })
   } catch (err) {
      console.log(err);
   }
}

exports.bookLesson = async(req, res, next) => {
   try {
      const lesson = req.body;
      const tutor = await User.findById(lesson.tutor);
      if(!tutor || tutor.role != 'tutor') {
         return res.status(400).send({
            status: 'failed',
            message: 'Tutor does not exist'
         })
      }
      const student = await User.findById(lesson.student);
      if(!student) {
         return res.status(400).send({
            status: 'failed',
            message: 'Student does not exist'
         })
      }
      const title = await Lesson.find({ title: lesson.title });
      if(title) {
         return res.status(400).send({
            status: 'failed',
            message: 'Lesson title already exist'
         })
      }
      await lesson.save();
      student.lessons.push(lesson);
      tutor.lessons.push(lesson);
      await student.save();
      await tutor.save();
      res.status(201).send({
         status: 'failed',
         message: 'Lesson created successfully',
         lesson
      })
   } catch (err) {
      console.log(err);
   }
}

exports.updateLesson = async(req, res, next) => {
   try {
      const updateLesson = req.body;
      const tutor = await User.findById(updateLesson.tutor);
      if(!tutor || tutor.role != 'tutor') {
         return res.status(400).send({
            status: 'failed',
            message: 'Tutor does not exist'
         })
      }
      const student = await User.findById(updateLesson.student);
      if(!student) {
         return res.status(400).send({
            status: 'failed',
            message: 'Student does not exist'
         })
      }
      const title = await Lesson.find({ title: updateLesson.title });
      if(title) {
         return res.status(400).send({
            status: 'failed',
            message: 'Lesson title already exist'
         })
      }
      await updateLesson.save();
      student.lessons.push(updateLesson);
      tutor.lessons.push(updateLesson);
      await student.save();
      await tutor.save();
      res.status(201).send({
         status: 'failed',
         message: 'Lesson created successfully',
         newLesson
      })
   } catch (err) {
      console.log(err);
   }
}

exports.deleteLesson = async(req, res, next) => {
   try {
      const { lessonId } = req.params;
      const lesson = await Lesson.findByIdAndDelete(lessonId);
      if(!lesson) {
         return res.status(400).send({
            status: 'failed',
            message: 'Error deleting lesson'
         })
      }
      res.send({
         status: 'success',
         message: 'Lesson deleted successfully'
      })
   } catch (err) {
      console.log(err);
   }
}