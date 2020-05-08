const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const studentRoutes = require('./routes/student');
const tutorRoutes = require('./routes/tutor');
const adminRoutes = require('./routes/admin');

//DB Config
mongoose.connect('mongodb://localhost/playdb', { 
   useNewUrlParser: true, 
   useCreateIndex: true, 
   useUnifiedTopology: true 
});
const db = mongoose.connection;
db.once('open', () => {
   console.log('Connected to database')
})
db.on('error', error => {
   console.error(error)
})

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/api/v1/', studentRoutes);
app.use('/api/v1/', tutorRoutes);
app.use('/api/v1/', adminRoutes);

//Error handling
app.use((req, res, next) => {
   const error = new Error('Not found!')
   error.status = 404
   next(error)
})

//Port listener
app.use((error, req, res, next) => {
   res.status(error.status || 500)
   res.json({
      error: {
         message: error.message
      }
   })
})

app.listen('4000', () => {
   console.log('Server running on port 4000')
})