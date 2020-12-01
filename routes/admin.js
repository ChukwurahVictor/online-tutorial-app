const router = require('express').Router();
const adminControllers = require('../controllers/admin');
const { isAuthenticatedAndPassUser, isAdmin } = require('../middleware/check-auth');

//Create Category
router.post('/category', isAuthenticatedAndPassUser, isAdmin, adminControllers.createCategory);

//Retrieve all categories
router.get('/category', isAuthenticatedAndPassUser, isAdmin, adminControllers.getAllCategories);

//Retrieve a category
router.get('/category/:categoryId', isAuthenticatedAndPassUser, isAdmin, adminControllers.getCategory);

//Update a category
router.patch('/category/:categoryId', isAuthenticatedAndPassUser, isAdmin, adminControllers.updateCategory);

//Delete a category
router.delete('/category/:categoryId', isAuthenticatedAndPassUser, isAdmin, adminControllers.deleteCategory);


//Create Subject
router.post('/subjects', isAuthenticatedAndPassUser, isAdmin, adminControllers.createSubject);

//Retrieve all subjects
router.get('/subjects', isAuthenticatedAndPassUser, isAdmin, adminControllers.getAllSubjects);

//Retreive a subject
router.get('/subjects/:subjectId', isAuthenticatedAndPassUser, isAdmin, adminControllers.getSubject);

//Update Subject
router.patch('/subjects/:subjectId', isAuthenticatedAndPassUser, isAdmin, adminControllers.updateSubject);

//Delete Subject
router.delete('/subjects/:subjectId', isAuthenticatedAndPassUser, isAdmin, adminControllers.deleteSubject);


//Retrieve all tutors
router.get('/tutors', isAuthenticatedAndPassUser, isAdmin, adminControllers.fetchAllTutors);

//Retrieve a tutor
router.get('/tutors/:tutorId', isAuthenticatedAndPassUser, isAdmin, adminControllers.getTutor);

//Deactivate a tutor
router.delete('/tutors/:tutorId', isAuthenticatedAndPassUser, isAdmin, adminControllers.deactivateTutor);


//Book Lesson
router.post('/lessons', isAuthenticatedAndPassUser, isAdmin, adminControllers.bookLesson);

//Retrieve all lessons
router.get('/lessons', isAuthenticatedAndPassUser, isAdmin, adminControllers.getAllLessons);

//Retrieve a lesson
router.get('/lessons/:lessonId', isAuthenticatedAndPassUser, isAdmin, adminControllers.getLesson);

//Update a lesson
router.patch('/lessons/:lessonId', isAuthenticatedAndPassUser, isAdmin, adminControllers.updateLesson);

//Delete a lesson
router.delete('/lessons/:lessonId', isAuthenticatedAndPassUser, isAdmin, adminControllers.deleteLesson);

module.exports = router;