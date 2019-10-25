//Update the name of the controller below and rename the file.
const client_controller = require("../controllers/client_controller.js");
const exercise_controller = require("../controllers/exercise_controller.js");
const auth = require("../controllers/auth.js");
const jwt = require("jsonwebtoken");

module.exports = function(app){

  // CLIENT ROUTES
  app.get('/client', client_controller.getUsers);

  // Now a CREATE CLIENT ROUTE
  app.post('/newClient', auth.createUser);

  // Now a LOGIN CLIENT ROUTE
  app.post('/login', auth.login);

  // app.use(verifyToken) // (Protected Below, UnProtected Above)

  // EXERCISE ROUTES
  app.get('/exercise', exercise_controller.getExercise);
  app.post('/exercise', exercise_controller.postExercise);
  app.get('/exercise/:id', exercise_controller.getSinlgeExercise);


}