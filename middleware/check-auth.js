const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(req.body.token, 'somesecretkey');
//     req.userData = decoded;
//     next();
//   } catch(error) {
//     return res.status(401).json({
//       message: 'Auth failed'
//     });
//   }
// };

module.exports = function ensureAuthenticated(req, res, next) {
   if (!req.headers.authorization) {
     return res.status(401).send({ error: 'TokenMissing' });
   }
   var token = req.headers.authorization.split(' ')[1];
 
   var payload = null;
   try {
     payload = jwt.decode(token, config.TOKEN_SECRET);
   }
   catch (err) {
     return res.status(401).send({ error: "TokenInvalid" });
   }
 
   if (payload.exp <= moment().unix()) {
     return res.status(401).send({ error: 'TokenExpired' });
   }
   // check if the user exists
   Person.findById(payload.sub, function(err, person){
     if (!person){
       return res.status(401).send({error: 'PersonNotFound'});
     } else {
       req.user = payload.sub;
       next();
     }
   });
 };
 