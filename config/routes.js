//Update the name of the controller below and rename the file.
const client_controller = require("../controllers/client_controller.js");
const exercise_controller = require("../controllers/exercise_controller.js");
const auth = require("../controllers/auth.js");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || 'secret';

module.exports = function(app){

  // CLIENT ROUTES
  app.get('/client', client_controller.getUsers);

  // Now a CREATE CLIENT ROUTE
  app.post('/newClient', auth.createUser);
  app.post('/login', auth.loginUser);

  // Now a LOGIN CLIENT ROUTE
  app.post('/clients', client_controller.login);

  // app.use(verifyToken) // (Protected Below, UnProtected Above)

  // EXERCISE ROUTES
  app.get('/exercise', exercise_controller.getExercise);
  app.post('/exercise', exercise_controller.postExercise);
  app.get('/exercise/:id', exercise_controller.getSinlgeExercise);


}

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(401).send({message: 'You are not authorized to view that resource, Please log in to continue.' });
      } else {
        // if everything is good, save to request for use in other routes
        delete decoded.password;
        req.decoded = decoded;
        // console.log(decoded)
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(401).send({
        message: 'You are not authorized to view that resource, Please log in to continue.'
    });

  }
}