let middlewareObj = {};

middlewareObj.isAdmin = (req, res, next) => {
   if (req.user.isAdmin == true) {
      return next();
   }
   return res.status(404).send(Error)
}

module.exports = middlewareObj;