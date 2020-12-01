const router = require('express').Router();
const { subjectTutors, bookLesson } = require('../controllers/student');
const { isAuthenticated } = require('../middleware/check-auth');

//All tutors taking a course
router.get('/subjects/:subjectId', isAuthenticated, subjectTutors);

//Book a lesson
router.post('/lessons', isAuthenticated, bookLesson);

module.exports = router;