const router = require('express').Router();

const tutorControllers = require('../controllers/tutor');
const { isAuthenticatedAndPassUser, isTutor } = require('../middleware/check-auth');

//Register a subject
router.post('/registered-subjects', isAuthenticatedAndPassUser, isTutor, tutorControllers.registerSubject);

//Get all registered subjects
router.get('/registered-subjects', isAuthenticatedAndPassUser, isTutor, tutorControllers.registeredSubjects);

//Update registered subject
router.patch('/registered-subjects', isAuthenticatedAndPassUser, isTutor, tutorControllers.updateRegisteredSubject);

//Delete registered subject
router.delete('/registered-subjects', isAuthenticatedAndPassUser, isTutor, tutorControllers.deleteRegisteredSubject);

module.exports = router;