//to CREATE A ROUTER
//
// //  1st require express
// var express = require('express');
// //  create router ..always capitalized
// var router = express.Router();
// module.exports = router
//

//  1st require express
var express = require('express');
//  create router ..always capitalized
var router = express.Router();
var uuid = require('uuid');
var todos = []; // Holds all our to do's

function ToDo(title, body){
  this.title = title;
  this.body = body;
  this.created = new Date();
  this.deleted = null;
  this.id = uuid.v4();
}
todos.push(new ToDo('Math','You need to work on math.'), new ToDo('Angular','You need to work on angular too'),new ToDo('Angular-Material','You need to learn more about angular material also'));

router.param('id', function(req, res, next, id){
  for (var i = 0; i < todos.length; i++) {
    if(id === todos[i].id){
      // todos[i].completed = new Date();
      req.todo = todos[i];
      return next();
    }
  }
  res.status(400).send({err: "Can not find"});

});

// GET /api/v1/todo
router.get('/', function(req, res){
  res.send(todos);
});

router.post('/', function(req, res){
  var todo = new ToDo(req.body.title, req.body.body);
  // adds response to
  todos.push(todo);
  res.send(todo);
});

// DELETE /api/v1/todo/:id
router.delete('/:id', function(req, res){
  todos.splice(todos.indexOf(req.todo), 1);

});


      // MOVED UP TO ROUTER PARAM FUNCTION
// add functionality to complete btn with time stamp
router.put('/:id', function(req, res){
  req.todo.completed = new Date();
  res.send();
});


// Allows for complete button to switch back to re-add
router.patch('/:id', function(req, res){
  req.todo.completed = null;
  res.send();
});
module.exports = router;
