const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/todojsondb');

const Todo = require('./todomongoose.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/static', express.static('static'));

let todo = new Todo({});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

app.get('/api/todos', function (req, res) {
  Todo.find({}).then(function(todos) {
    res.json(todos);
  })
})

app.post('/api/todos/', function (req, res) {

  let todo = new Todo({title: req.body.title, completed: req.body.completed});
  todo.save().then(function(resp) {
    console.log(resp)
    res.json(resp)
  }).catch(function() {
    console.log("I can't let you do that, Dave")
  })
})

app.get('/api/todos/:id', function(req, res) {
  var id =  req.params.id;
  Todo.findById(id)
    .then(function (todo) {
    res.json(todo)
  })
});

app.put('/api/todos/:id', function (req, res) {
  var id = req.params.id;
  var update = req.body.edit;
  Todo.findById(id).then(function (todo) {
    db.Todo.update(
      { todo },
      { $set: { "title": update } }
    )
  })
})

app.patch('/api/todos[/id]', function (req, res) {
  // partially update a todo item. Returns the modified todo item.
})


app.delete('/api/todos[/id]', function (req, res) {
  var id = req.params.id;
  Todo.findById(id).then(function (todo) {
    Todo.remove({_id: id}.then(function (item) {
        res.json({ message: 'Successfully deleted' });
        })
    )
  })
});

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
