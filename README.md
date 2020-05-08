# Online-tutor-app
An online tutor app API Documentation

#  STUDENTS
## Endpoints
POST  /signup/student - To signup a new student<br>
POST  /login/student  - To login as a student<br>
GET   /subject/tutors - To see all tutors taking a subject<br>
POST  /lesson         - To book a lesson<br>

# TUTORS
## Endpoints
POST    /signup/tutor         - To signup as a tutor<br>
POST    /login/tutor          - To login as a tutor<br>
POST    /register/:subjectId  - To register a subject as a tutor<br>
GET     /subject/registered   - To get all subjects registered<br>
PATCH   /subject              - To update a registered subject<br>
DELETE  /subject              - To delete a registered subject<br>

# GENERAL (STUDENTS, TUTORS, ADMIN)
## Endpoints 
GET /category/:subjectId   - To retrieve a subject in a category<br>
GET /:categoryId  - To retrieve a category and all its subjects<br>
GET /category - To get all categories<br>
GET /subjects/search - To search for subjects sorted alphabetically<br>
GET /tutors/sort/first_name - To search for tutors by first name sorted alphabetically<br>

# ADMIN
## Endpoints
POST  /admin/subject  - create a new subject<br>
PATCH /admin/subject  - update a subject<br>
PATCH /admin/category  - update a category<br>
DELETE /admin/subject/:subjectId - delete a subject<br>
PATCH /admin/category  - update a category<br>
DELETE /admin/category/:categoryId - delete a category<br>
GET /tutors - retrieve all tutors<br>
GET /tutors/:tutorId - get a tutor<br>
DELETE /tutors/:tutorId - deactivate a tutor<br>
POST /lesson  - book lesson<br>
GET /lesson - get all lessons<br>
GET /lesson/:lessonId - get a lesson<br>
PATCH /lesson/:lessonId - update a lesson<br>
DELETE /lesson/:lessonId - delete a lesson<br>
