const router = require('express').Router();

const { signUp, logIn } = require('../controllers/auth');
const {
   registerSubject,
   createCategory,
   createSubject,
   getCategory
} = require('../controllers/tutor');

//Tutor signup
router.post('/signup/tutor', signUp);

//Tutor login
router.post('/login/tutor', logIn);

//Register a subject
router.post('/register/:subjectId', registerSubject);

module.exports = router;