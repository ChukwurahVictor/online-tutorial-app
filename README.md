# Online-tutor-app
An online tutor app API Documentation<br>
<br>
heroku: https://online-tutorial-app.herokuapp.com/

# GENERAL (STUDENTS, TUTORS, ADMIN)
## Endpoints
POST  /signup - To signup a new student/tutor<br>
POST  /login  - To login as a student/tutor<br>
GET /subjects  - To retrieve a subject in a category<br>
GET /subjects/:subjectId  - To retrieve a category and all its subjects<br>
GET /category - To get all categories<br>
GET /subjects/search - To search for subjects sorted alphabetically<br>
GET /tutors/sort/first_name - To search for tutors by first name sorted alphabetically<br>

#  STUDENTS
## Endpoints
GET   /subject/:subjectId - To see all tutors taking a subject<br>
POST  /lessons         - To book a lesson<br>

# TUTORS
## Endpoints
POST    /registered-subjects   - To register a subject as a tutor<br>
GET     /registered-subjects   - To get all subjects registered<br>
PATCH   /registered-subjects   - To update a registered subject<br>
DELETE  /registered-subjects   - To delete a registered subject<br>

# ADMIN
## Endpoints
POST  /admin/subjects  - create a new subject<br>
PATCH /admin/subjects  - update a subject<br>
PATCH /admin/category  - update a category<br>
DELETE /admin/subjects/:subjectId - delete a subject<br>
PATCH /admin/category  - update a category<br>
DELETE /admin/category/:categoryId - delete a category<br>
GET /admin/tutors - retrieve all tutors<br>
GET /admin/tutors/:tutorId - get a tutor<br>
DELETE /admin/tutors/:tutorId - deactivate a tutor<br>
POST /admin/lessons  - book lesson<br>
GET /admin/lessons - get all lessons<br>
GET /admin/lessons/:lessonId - get a lesson<br>
PATCH /admin/lessons/:lessonId - update a lesson<br>
DELETE /admin/lessons/:lessonId - delete a lesson<br>
