const router = require('express').Router();
const authController = require('../controllers/auth');
const generalController = require('../controllers/admin');
const { isAuthenticated } = require('../middleware/check-auth');

const check = require('../middleware/check-auth');

router.post('/signup', authController.signUp);

router.post('/login', authController.logIn);

router.get('/category', isAuthenticated, generalController.getAllCategories);

router.get('/category/:categoryId', isAuthenticated, generalController.getCategory);

router.get('/subjects', isAuthenticated, generalController.getAllSubjects);

router.get('/subjects/:subjectId', isAuthenticated, generalController.getSubject);

module.exports = router;