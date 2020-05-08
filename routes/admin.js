const router = require('express').Router();
const middleware = require('../middleware/index');
const { signUp, logIn } = require('../controllers/auth');
const {
   createCategory,
   createSubject,
   updateSubject,
   deleteSubject
} = require('../controllers/admin');

//Create Category
router.post('/category', createCategory);

//Create Subject
router.post('/subject', createSubject);

//Update Subject
router.patch('/subject', updateSubject);

//Delete Subject
router.delete('/subject', deleteSubject);

module.exports = router;