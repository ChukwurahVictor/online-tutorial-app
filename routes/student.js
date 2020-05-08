const router = require('express').Router();
const { signUp, logIn } = require('../controllers/auth');
const { createLesson, bookLesson } = require('../controllers/student');
const ensureAuthenticated = require('../middleware/check-auth');

//Student signup
router.post('/signup/student', signUp);

//Student login
router.post('/login/student', logIn);

//All tutors taking a course
router.get('/tutors/:subjectId', (req, res) => {
   res.send('nothing')
})

//Create a lesson
router.post('/lesson', ensureAuthenticated, createLesson)

//Book a lesson
router.post('/lesson/:lessonId', bookLesson)

module.exports = router;